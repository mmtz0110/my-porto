import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { IDCardCustomConfig } from "../types";
import { DEFAULT_ID_CARD_CONFIG } from "../data/portfolioData";

/* ==========================================================================
   1. TYPES & DATA INTERFACES
   ========================================================================== */

export interface StandaloneCardData extends IDCardCustomConfig {
  accentColor: string;
  secondaryColor: string;
  textColor: string;
}

export interface StandaloneLanyardData {
  text: string;
  textColor: string;
  strapColor: string;
  secondaryColor: string;
  width: number;
  pattern: "repeating_text" | "repeating_logo" | "striped_edge" | "solid_minimal";
  showSafetyBuckle: boolean;
  buckleColor?: string;
}

export interface StandaloneHardwareData {
  holderType: "acrylic_clear" | "frosted_pvc" | "matte_black" | "leather_sleeve" | "borderless";
  holderColor?: string;
  hardwareFinish: "chrome_silver" | "matte_black" | "luxury_gold" | "gunmetal";
  useRetractableReel: boolean;
  reelColor?: string;
}

export interface PhysicsParams {
  gravity: number;
  swingSpring: number;
  swingDamping: number;
  stretchSpring: number;
  stretchDamping: number;
  maxStretch: number;
  rotSpring: number;
  rotDamping: number;
}

/* ==========================================================================
   2. WEB AUDIO SYNTHESIZER
   ========================================================================== */

class SoundSynthesizer {
  private ctx: AudioContext | null = null;
  private enabled: boolean = true;

  private getContext(): AudioContext | null {
    if (!this.enabled) return null;
    if (!this.ctx && typeof window !== "undefined") {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume();
    }
    return this.ctx;
  }

  public playBounce(intensity: number = 1.0) {
    const ctx = this.getContext();
    if (!ctx) return;
    try {
      const t = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      const startFreq = 160 + Math.min(intensity, 2) * 90;
      osc.type = "sine";
      osc.frequency.setValueAtTime(startFreq, t);
      osc.frequency.exponentialRampToValueAtTime(45, t + 0.28);

      gain.gain.setValueAtTime(0.22 * Math.min(intensity, 1.5), t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.28);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(t);
      osc.stop(t + 0.28);
    } catch {}
  }

  public playWhoosh(intensity: number = 1.0) {
    const ctx = this.getContext();
    if (!ctx) return;
    try {
      const t = ctx.currentTime;
      const bufferSize = ctx.sampleRate * 0.18;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.3));
      }

      const whiteNoise = ctx.createBufferSource();
      whiteNoise.buffer = buffer;

      const filter = ctx.createBiquadFilter();
      filter.type = "bandpass";
      filter.frequency.setValueAtTime(400, t);
      filter.frequency.exponentialRampToValueAtTime(1200 * intensity, t + 0.08);
      filter.frequency.exponentialRampToValueAtTime(300, t + 0.18);
      filter.Q.value = 2.5;

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.15 * intensity, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.18);

      whiteNoise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      whiteNoise.start(t);
    } catch {}
  }
}

export const soundFx = new SoundSynthesizer();

/* ==========================================================================
   3. HIGH RESOLUTION PROCEDURAL TEXTURE GENERATORS
   ========================================================================== */

function loadImageSafely(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    if (!url || typeof url !== "string" || url.trim() === "") {
      return reject(new Error("Empty image URL"));
    }

    const cleanUrl = url.trim();
    const isExternal = cleanUrl.startsWith("http://") || cleanUrl.startsWith("https://");

    const img = new Image();
    if (isExternal) {
      img.crossOrigin = "anonymous";
    }

    img.onload = () => resolve(img);
    img.onerror = () => {
      // If external or crossOrigin failed, retry without crossOrigin as fallback
      if (isExternal) {
        const fallbackImg = new Image();
        fallbackImg.onload = () => resolve(fallbackImg);
        fallbackImg.onerror = (err) => reject(err);
        fallbackImg.src = cleanUrl;
        return;
      }

      // If relative path without leading slash, try with leading slash or /src/data/
      if (!cleanUrl.startsWith("/") && !cleanUrl.startsWith("data:") && !cleanUrl.startsWith("blob:")) {
        const publicRetry = new Image();
        publicRetry.onload = () => resolve(publicRetry);
        publicRetry.onerror = () => {
          const srcDataRetry = new Image();
          srcDataRetry.onload = () => resolve(srcDataRetry);
          srcDataRetry.onerror = (err) => reject(err);
          srcDataRetry.src = `/src/data/${cleanUrl.replace(/^\.?\//, "")}`;
        };
        publicRetry.src = `/${cleanUrl}`;
        return;
      }

      reject(new Error(`Failed to load image from: ${cleanUrl}`));
    };

    img.src = cleanUrl;
  });
}

/**
 * Draws the front face of the ID card on a high-res 1024x1624 canvas
 */
export async function generateCardFrontCanvas(card: StandaloneCardData): Promise<HTMLCanvasElement> {
  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 1624;
  const ctx = canvas.getContext("2d")!;

  // If full custom front design graphic is provided
  if (card.frontDesignUrl) {
    try {
      const customImg = await loadImageSafely(card.frontDesignUrl);
      ctx.drawImage(customImg, 0, 0, canvas.width, canvas.height);
      return canvas;
    } catch (e) {
      console.warn("Could not load custom frontDesignUrl, falling back to procedural layout.", e);
    }
  }

  // 1. Dark Modern Background Fill
  ctx.fillStyle = card.secondaryColor || "#09090b";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Subtle background grid lines
  ctx.strokeStyle = "rgba(255, 255, 255, 0.03)";
  ctx.lineWidth = 1.5;
  for (let x = 0; x < canvas.width; x += 40) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, canvas.height);
    ctx.stroke();
  }
  for (let y = 0; y < canvas.height; y += 40) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(canvas.width, y);
    ctx.stroke();
  }

  // 2. Top Header Accent Header
  const accent = card.accentColor || "#3b82f6";
  ctx.fillStyle = accent;
  ctx.fillRect(0, 0, canvas.width, 310);

  // Diagonal slice graphic accent
  ctx.fillStyle = "rgba(0, 0, 0, 0.35)";
  ctx.beginPath();
  ctx.moveTo(0, 310);
  ctx.lineTo(canvas.width, 220);
  ctx.lineTo(canvas.width, 310);
  ctx.closePath();
  ctx.fill();

  // Draw optional custom Logo if available
  if (card.logoUrl) {
    try {
      const logoImg = await loadImageSafely(card.logoUrl);
      ctx.drawImage(logoImg, 60, 50, 80, 80);
    } catch {}
  }

  // Company / Institution Name
  ctx.fillStyle = "#FFFFFF";
  ctx.font = 'bold 50px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.textAlign = "left";
  ctx.fillText((card.companyName || "UNIVERSITAS NUSA PUTRA").toUpperCase(), 60, 130);

  // Sub-badge / Access Tier Label
  ctx.font = "bold 22px monospace";
  ctx.fillStyle = "rgba(255, 255, 255, 0.9)";
  ctx.fillText("STUDENT & ENGINEER // ID VERIFIED", 60, 190);

  // 3. Photo Avatar Box
  const avatarSize = 390;
  const avatarX = (canvas.width - avatarSize) / 2;
  const avatarY = 370;

  // Avatar Border Frame
  ctx.fillStyle = "#18181b";
  ctx.fillRect(avatarX - 12, avatarY - 12, avatarSize + 24, avatarSize + 24);
  ctx.strokeStyle = accent;
  ctx.lineWidth = 6;
  ctx.strokeRect(avatarX - 12, avatarY - 12, avatarSize + 24, avatarSize + 24);

  // Load Custom Avatar Photo or Draw Fallback Vector Silhouette
  let avatarDrawn = false;
  if (card.avatarUrl) {
    try {
      const avatarImg = await loadImageSafely(card.avatarUrl);
      ctx.save();
      ctx.beginPath();
      ctx.rect(avatarX, avatarY, avatarSize, avatarSize);
      ctx.clip();
      ctx.drawImage(avatarImg, avatarX, avatarY, avatarSize, avatarSize);
      ctx.restore();
      avatarDrawn = true;
    } catch (e) {
      console.warn("Could not load avatarUrl image, drawing default avatar silhouette.", e);
    }
  }

  if (!avatarDrawn) {
    ctx.fillStyle = "#27272a";
    ctx.fillRect(avatarX, avatarY, avatarSize, avatarSize);
    ctx.fillStyle = "#52525b";
    // Head
    ctx.beginPath();
    ctx.arc(avatarX + avatarSize / 2, avatarY + 140, 75, 0, Math.PI * 2);
    ctx.fill();
    // Body
    ctx.beginPath();
    ctx.arc(avatarX + avatarSize / 2, avatarY + 370, 165, Math.PI, 0, false);
    ctx.fill();
  }

  // 4. Holder's Full Name
  ctx.fillStyle = card.textColor || "#FFFFFF";
  ctx.font = '900 62px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.textAlign = "center";
  ctx.fillText((card.name || "AGNAYA MUMTAZUL").toUpperCase(), canvas.width / 2, 855);

  // Role / Specialization Title
  ctx.fillStyle = accent;
  ctx.font = 'bold 32px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.letterSpacing = "2px";
  ctx.fillText((card.role || "SOFTWARE ENGINEER").toUpperCase(), canvas.width / 2, 915);

  // Department
  ctx.fillStyle = "rgba(255, 255, 255, 0.65)";
  ctx.font = '500 26px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText((card.department || "INFORMATICS & AI LABS").toUpperCase(), canvas.width / 2, 965);

  // 5. Meta Information Box (ID Number, Issued, Expiry)
  const metaY = 1040;
  ctx.fillStyle = "#18181b";
  ctx.fillRect(80, metaY, canvas.width - 160, 205);
  ctx.strokeStyle = "rgba(255, 255, 255, 0.12)";
  ctx.lineWidth = 2;
  ctx.strokeRect(80, metaY, canvas.width - 160, 205);

  ctx.textAlign = "left";
  ctx.font = "bold 22px monospace";
  ctx.fillStyle = "rgba(255, 255, 255, 0.45)";
  ctx.fillText("ID NUMBER", 110, metaY + 50);
  ctx.fillText("ISSUED", 110, metaY + 110);
  ctx.fillText("EXPIRES", 110, metaY + 170);

  ctx.fillStyle = "#FFFFFF";
  ctx.font = "bold 26px monospace";
  ctx.fillText(card.idNumber || "AM-2024-NUP", 380, metaY + 50);
  ctx.fillText(card.issuedDate || "09/2024", 380, metaY + 110);
  ctx.fillText(card.expiryDate || "08/2028", 380, metaY + 170);

  // Holographic Security Sticker
  if (card.showHologram !== false) {
    const holoX = canvas.width - 240;
    const holoY = metaY + 45;
    const holoGrad = ctx.createLinearGradient(holoX, holoY, holoX + 115, holoY + 115);
    holoGrad.addColorStop(0, "#38bdf8");
    holoGrad.addColorStop(0.35, "#c084fc");
    holoGrad.addColorStop(0.7, "#fde047");
    holoGrad.addColorStop(1, "#4ade80");
    ctx.fillStyle = holoGrad;
    ctx.fillRect(holoX, holoY, 115, 115);
    ctx.strokeStyle = "#FFFFFF";
    ctx.lineWidth = 2;
    ctx.strokeRect(holoX, holoY, 115, 115);
    ctx.fillStyle = "#000000";
    ctx.font = "900 18px monospace";
    ctx.textAlign = "center";
    ctx.fillText("SECURE", holoX + 57, holoY + 65);
  }

  // 6. Barcode Section
  if (card.showBarcode !== false) {
    const barcodeY = 1320;
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(80, barcodeY, canvas.width - 160, 140);
    ctx.fillStyle = "#000000";
    let bx = 110;
    const seed = [4, 2, 6, 2, 8, 3, 2, 5, 2, 7, 3, 2, 6, 4, 3, 8, 2, 4, 6, 3, 7, 2, 5, 3];
    for (let i = 0; i < 48; i++) {
      const w = seed[i % seed.length];
      if (i % 2 === 0) {
        ctx.fillRect(bx, barcodeY + 15, w * 2.2, 80);
      }
      bx += w * 3.4;
      if (bx > canvas.width - 120) break;
    }
    ctx.font = "bold 22px monospace";
    ctx.textAlign = "center";
    ctx.fillText(`* ${card.idNumber || "AM-2024-NUP"} *`, canvas.width / 2, barcodeY + 125);
  }

  // 7. EMV Smart Chip Graphic
  if (card.showChip !== false) {
    const chipX = 80;
    const chipY = 480;
    ctx.fillStyle = "#E5A93C";
    ctx.fillRect(chipX, chipY, 125, 95);
    ctx.strokeStyle = "#8B5A10";
    ctx.lineWidth = 2;
    ctx.strokeRect(chipX, chipY, 125, 95);
    // Chip contact routes
    ctx.beginPath();
    ctx.moveTo(chipX + 42, chipY);
    ctx.lineTo(chipX + 42, chipY + 95);
    ctx.moveTo(chipX + 83, chipY);
    ctx.lineTo(chipX + 83, chipY + 95);
    ctx.moveTo(chipX, chipY + 48);
    ctx.lineTo(chipX + 125, chipY + 48);
    ctx.stroke();
  }

  // Footer Disclaimer
  ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
  ctx.font = "18px monospace";
  ctx.textAlign = "center";
  ctx.fillText("PROPERTY OF ISSUER • IF FOUND RETURN IMMEDIATELY", canvas.width / 2, 1560);

  return canvas;
}

/**
 * Draws the back face of the ID card on a 1024x1624 canvas
 */
export async function generateCardBackCanvas(card: StandaloneCardData): Promise<HTMLCanvasElement> {
  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 1624;
  const ctx = canvas.getContext("2d")!;

  if (card.backDesignUrl) {
    try {
      const customBackImg = await loadImageSafely(card.backDesignUrl);
      ctx.drawImage(customBackImg, 0, 0, canvas.width, canvas.height);
      return canvas;
    } catch (e) {
      console.warn("Could not load custom backDesignUrl, falling back to procedural layout.", e);
    }
  }

  ctx.fillStyle = "#121215";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Magnetic Stripe
  ctx.fillStyle = "#1c1917";
  ctx.fillRect(0, 80, canvas.width, 220);

  // Signature Strip
  ctx.fillStyle = "#f4f4f5";
  ctx.fillRect(80, 360, canvas.width - 160, 160);
  ctx.fillStyle = "#1e293b";
  ctx.font = "italic 36px 'Brush Script MT', cursive, sans-serif";
  ctx.textAlign = "center";
  ctx.fillText(card.name || "Agnaya Mumtazul", canvas.width / 2, 460);

  // Security Notice Box
  const noticeY = 580;
  ctx.fillStyle = "#18181b";
  ctx.fillRect(80, noticeY, canvas.width - 160, 440);
  ctx.strokeStyle = "rgba(255, 255, 255, 0.1)";
  ctx.lineWidth = 2;
  ctx.strokeRect(80, noticeY, canvas.width - 160, 440);

  ctx.fillStyle = "#FFFFFF";
  ctx.font = "bold 26px -apple-system, BlinkMacSystemFont, sans-serif";
  ctx.textAlign = "left";
  ctx.fillText("TERMS & CONDITIONS", 110, noticeY + 50);

  ctx.fillStyle = "rgba(255, 255, 255, 0.7)";
  ctx.font = "20px -apple-system, BlinkMacSystemFont, sans-serif";
  const lines = [
    "1. This credential card remains the property of the issuing university.",
    "2. Cardholder must present this ID upon entry to campus premises & labs.",
    "3. Misuse or alteration of this credential is strictly prohibited.",
    "4. Report lost cards immediately to the IT & Academic Registry office.",
  ];
  lines.forEach((line, idx) => {
    ctx.fillText(line, 110, noticeY + 110 + idx * 45);
  });

  // Emergency / Support Info
  ctx.fillStyle = card.accentColor || "#3b82f6";
  ctx.font = "bold 20px monospace";
  ctx.fillText(card.emergencyContact || "TEL: +62 851-8338-0962 • mumtazulagnaya@gmail.com", 110, noticeY + 350);

  // Procedural QR Code
  const qrSize = 360;
  const qrX = (canvas.width - qrSize) / 2;
  const qrY = 1080;

  ctx.fillStyle = "#FFFFFF";
  ctx.fillRect(qrX - 20, qrY - 20, qrSize + 40, qrSize + 40);
  ctx.fillStyle = "#000000";
  ctx.fillRect(qrX, qrY, qrSize, qrSize);

  // Position detection patterns
  const drawMarker = (mx: number, my: number) => {
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(mx, my, 60, 60);
    ctx.fillStyle = "#000000";
    ctx.fillRect(mx + 10, my + 10, 40, 40);
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(mx + 20, my + 20, 20, 20);
  };
  drawMarker(qrX + 15, qrY + 15);
  drawMarker(qrX + qrSize - 75, qrY + 15);
  drawMarker(qrX + 15, qrY + qrSize - 75);

  for (let r = 0; r < 14; r++) {
    for (let c = 0; c < 14; c++) {
      if (Math.sin(r * 3 + c * 7) > 0.1) {
        ctx.fillRect(qrX + 85 + c * 10, qrY + 85 + r * 10, 8, 8);
      }
    }
  }

  // Serial Number
  ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
  ctx.font = "bold 24px monospace";
  ctx.textAlign = "center";
  ctx.fillText(`SERIAL: CR80-AGNAYA-2024-NUP`, canvas.width / 2, 1560);

  return canvas;
}

/**
 * Generates the woven ribbon fabric texture for the lanyard
 */
export function generateLanyardFabricCanvas(lanyard: StandaloneLanyardData): HTMLCanvasElement {
  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 256;
  const ctx = canvas.getContext("2d")!;

  ctx.fillStyle = lanyard.strapColor || "#09090b";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Micro Fabric Weave Grid
  ctx.fillStyle = "rgba(255, 255, 255, 0.05)";
  for (let x = 0; x < canvas.width; x += 4) {
    for (let y = 0; y < canvas.height; y += 4) {
      if ((x + y) % 8 === 0) {
        ctx.fillRect(x, y, 2, 2);
      }
    }
  }

  // Border Accent Edges
  ctx.fillStyle = lanyard.secondaryColor || "#3b82f6";
  ctx.fillRect(0, 0, canvas.width, 8);
  ctx.fillRect(0, canvas.height - 8, canvas.width, 8);

  // Repeating Text
  const textStr = (lanyard.text || "AGNAYA MUMTAZUL • UNIVERSITAS NUSA PUTRA • SOFTWARE ENGINEER • ").toUpperCase();
  ctx.fillStyle = lanyard.textColor || "#FFFFFF";
  ctx.font = 'bold 70px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.textBaseline = "middle";
  ctx.textAlign = "left";
  ctx.letterSpacing = "4px";

  const textWidth = ctx.measureText(textStr).width;
  const repeatCount = Math.ceil(canvas.width / textWidth) + 2;

  for (let i = 0; i < repeatCount; i++) {
    ctx.fillText(textStr, i * textWidth, canvas.height / 2);
  }

  return canvas;
}

export function generateFabricNormalCanvas(): HTMLCanvasElement {
  const canvas = document.createElement("canvas");
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext("2d")!;
  const imgData = ctx.createImageData(256, 256);
  const data = imgData.data;

  for (let y = 0; y < 256; y++) {
    for (let x = 0; x < 256; x++) {
      const idx = (y * 256 + x) * 4;
      const wave = Math.sin((x + y) * 0.8) * Math.cos((x - y) * 0.8);
      const nx = 128 + wave * 25;
      const ny = 128 + wave * 25;
      data[idx] = nx;
      data[idx + 1] = ny;
      data[idx + 2] = 255;
      data[idx + 3] = 255;
    }
  }
  ctx.putImageData(imgData, 0, 0);
  return canvas;
}

/* ==========================================================================
   4. PHYSICS ENGINE (PENDULUM & ELASTIC REBOUND)
   ========================================================================== */

export const DEFAULT_PHYSICS_PARAMS: PhysicsParams = {
  gravity: 9.8,
  swingSpring: 30.0,
  swingDamping: 2.2,
  stretchSpring: 40.0,
  stretchDamping: 3.2,
  maxStretch: 6.5,
  rotSpring: 26.0,
  rotDamping: 2.2,
};

export class CardPhysicsEngine {
  // Anchor is positioned higher so only half of the lanyard is framed in view
  public anchorPoint: THREE.Vector3 = new THREE.Vector3(0, 10.5, 0);
  public restPosition: THREE.Vector3 = new THREE.Vector3(0, -3.2, 0);
  public position: THREE.Vector3 = new THREE.Vector3(0, -3.2, 0);
  public velocity: THREE.Vector3 = new THREE.Vector3(0, 0, 0);
  public rotation: THREE.Euler = new THREE.Euler(0, 0, 0, "YXZ");
  public angVel: THREE.Vector3 = new THREE.Vector3(0, 0, 0);
  public cardJiggle: THREE.Vector3 = new THREE.Vector3(0, 0, 0);
  public cardJiggleVel: THREE.Vector3 = new THREE.Vector3(0, 0, 0);

  public isDragging: boolean = false;
  public dragCurrentPos: THREE.Vector3 = new THREE.Vector3();
  public dragPrevPos: THREE.Vector3 = new THREE.Vector3();
  public dragVelocity: THREE.Vector3 = new THREE.Vector3();
  public dragPlane: THREE.Plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
  public dragOffset: THREE.Vector3 = new THREE.Vector3();

  constructor() {
    this.reset();
  }

  public startDrag(hitPoint: THREE.Vector3, cameraDir: THREE.Vector3) {
    this.isDragging = true;
    this.dragCurrentPos.copy(hitPoint);
    this.dragPrevPos.copy(hitPoint);
    this.dragVelocity.set(0, 0, 0);
    this.dragOffset.subVectors(hitPoint, this.position);

    const normal = cameraDir.clone().negate().normalize();
    this.dragPlane.setFromNormalAndCoplanarPoint(normal, hitPoint);

    this.velocity.set(0, 0, 0);
    this.angVel.set(0, 0, 0);
  }

  public updateDrag(worldPos: THREE.Vector3) {
    if (!this.isDragging) return;
    this.dragPrevPos.copy(this.dragCurrentPos);
    this.dragCurrentPos.copy(worldPos);
    this.dragVelocity.subVectors(this.dragCurrentPos, this.dragPrevPos);

    const targetCardPos = this.dragCurrentPos.clone().sub(this.dragOffset);
    const params = DEFAULT_PHYSICS_PARAMS;
    const offsetFromAnchor = targetCardPos.clone().sub(this.anchorPoint);
    const restDist = this.anchorPoint.distanceTo(this.restPosition);
    const maxAllowedDist = restDist + params.maxStretch;

    if (offsetFromAnchor.length() > maxAllowedDist) {
      offsetFromAnchor.setLength(maxAllowedDist);
      targetCardPos.copy(this.anchorPoint).add(offsetFromAnchor);
    }

    if (targetCardPos.y > this.anchorPoint.y - 1.5) {
      targetCardPos.y = this.anchorPoint.y - 1.5;
    }

    this.position.lerp(targetCardPos, 0.45);

    const dispFromAnchor = this.position.clone().sub(this.anchorPoint);
    const targetRollZ = -Math.atan2(dispFromAnchor.x, -dispFromAnchor.y) * 0.9;
    const targetPitchX = Math.atan2(dispFromAnchor.z, -dispFromAnchor.y) * 0.9;
    const targetYawY = THREE.MathUtils.clamp(-this.dragVelocity.x * 2.0, -0.6, 0.6);

    this.rotation.z += (targetRollZ - this.rotation.z) * 0.35;
    this.rotation.x += (targetPitchX - this.rotation.x) * 0.35;
    this.rotation.y += (targetYawY - this.rotation.y) * 0.35;

    this.angVel.z = (targetRollZ - this.rotation.z) * 8.0;
    this.angVel.x = (targetPitchX - this.rotation.x) * 8.0;
    this.angVel.y = (targetYawY - this.rotation.y) * 8.0;
  }

  public endDrag() {
    if (!this.isDragging) return;
    this.isDragging = false;

    this.velocity.copy(this.dragVelocity).multiplyScalar(35.0);
    this.velocity.clampLength(0, 45.0);

    this.angVel.z += -this.dragVelocity.x * 30.0;
    this.angVel.x += this.dragVelocity.z * 30.0;
    this.angVel.y += -this.dragVelocity.x * 25.0;

    const stretchDistance = this.getStretchDistance();
    if (stretchDistance > 0.4) {
      soundFx.playBounce(Math.min(stretchDistance / 2.5, 1.6));
    } else if (this.velocity.length() > 2.0 || this.angVel.length() > 2.0) {
      soundFx.playWhoosh(1.2);
    }
  }

  public getStretchDistance(): number {
    const currentDist = this.anchorPoint.distanceTo(this.position);
    const restDist = this.anchorPoint.distanceTo(this.restPosition);
    return Math.max(0, currentDist - restDist);
  }

  public update(dt: number) {
    const clampedDt = Math.min(dt, 0.05);
    const params = DEFAULT_PHYSICS_PARAMS;

    if (!this.isDragging) {
      const disp = this.position.clone().sub(this.restPosition);

      const springForceX = -params.swingSpring * disp.x;
      const springForceZ = -params.swingSpring * disp.z;
      const springForceY = -params.stretchSpring * disp.y;

      const dampingForceX = -params.swingDamping * this.velocity.x;
      const dampingForceZ = -params.swingDamping * this.velocity.z;
      const dampingForceY = -params.stretchDamping * this.velocity.y;

      const gravityForceY = -params.gravity * (disp.y > 0 ? 1.5 : 0.4);

      const accelX = springForceX + dampingForceX;
      const accelY = springForceY + dampingForceY + gravityForceY;
      const accelZ = springForceZ + dampingForceZ;

      this.velocity.x += accelX * clampedDt;
      this.velocity.y += accelY * clampedDt;
      this.velocity.z += accelZ * clampedDt;

      this.position.x += this.velocity.x * clampedDt;
      this.position.y += this.velocity.y * clampedDt;
      this.position.z += this.velocity.z * clampedDt;

      if (this.position.y > this.anchorPoint.y - 1.2) {
        this.position.y = this.anchorPoint.y - 1.2;
        this.velocity.y *= -0.3;
      }

      const rotTorqueX = -params.rotSpring * this.rotation.x - params.rotDamping * this.angVel.x;
      const rotTorqueY = -params.rotSpring * 0.8 * this.rotation.y - params.rotDamping * 0.8 * this.angVel.y;
      const rotTorqueZ = -params.rotSpring * this.rotation.z - params.rotDamping * this.angVel.z;

      const linearTiltCouplingZ = -accelX * 0.04;
      const linearTiltCouplingX = accelZ * 0.04;

      this.angVel.x += (rotTorqueX + linearTiltCouplingX) * clampedDt;
      this.angVel.y += rotTorqueY * clampedDt;
      this.angVel.z += (rotTorqueZ + linearTiltCouplingZ) * clampedDt;

      this.rotation.x += this.angVel.x * clampedDt;
      this.rotation.y += this.angVel.y * clampedDt;
      this.rotation.z += this.angVel.z * clampedDt;

      // Secondary Card Jiggle
      const jiggleSpring = 100.0;
      const jiggleDamping = 9.0;
      const jaccelX = -jiggleSpring * this.cardJiggle.x - jiggleDamping * this.cardJiggleVel.x - accelX * 0.015;
      const jaccelY = -jiggleSpring * this.cardJiggle.y - jiggleDamping * this.cardJiggleVel.y - accelY * 0.015;
      const jaccelZ = -jiggleSpring * this.cardJiggle.z - jiggleDamping * this.cardJiggleVel.z - accelZ * 0.015;

      this.cardJiggleVel.x += jaccelX * clampedDt;
      this.cardJiggleVel.y += jaccelY * clampedDt;
      this.cardJiggleVel.z += jaccelZ * clampedDt;

      this.cardJiggle.x += this.cardJiggleVel.x * clampedDt;
      this.cardJiggle.y += this.cardJiggleVel.y * clampedDt;
      this.cardJiggle.z += this.cardJiggleVel.z * clampedDt;
    }
  }

  public reset() {
    this.position.copy(this.restPosition);
    this.velocity.set(0, 0, 0);
    this.rotation.set(0, 0, 0);
    this.angVel.set(0, 0, 0);
    this.cardJiggle.set(0, 0, 0);
    this.cardJiggleVel.set(0, 0, 0);
    this.isDragging = false;
  }
}

/* ==========================================================================
   5. THREE.JS 3D MODEL BUILDER
   ========================================================================== */

function createRoundedRectShape(w: number, h: number, r: number): THREE.Shape {
  const shape = new THREE.Shape();
  const x = -w / 2;
  const y = -h / 2;
  shape.moveTo(x + r, y);
  shape.lineTo(x + w - r, y);
  shape.quadraticCurveTo(x + w, y, x + w, y + r);
  shape.lineTo(x + w, y + h - r);
  shape.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  shape.lineTo(x + r, y + h);
  shape.quadraticCurveTo(x, y + h, x, y + h - r);
  shape.lineTo(x, y + r);
  shape.quadraticCurveTo(x, y, x + r, y);
  return shape;
}

function createRibbonGeometry(
  curve: THREE.Curve<THREE.Vector3>,
  segments: number,
  width: number
): THREE.BufferGeometry {
  const positions: number[] = [];
  const uvs: number[] = [];
  const normals: number[] = [];
  const indices: number[] = [];
  const points = curve.getPoints(segments);
  const halfWidth = width / 2;

  for (let i = 0; i <= segments; i++) {
    const t = i / segments;
    const pt = points[i];
    const tangent = curve.getTangent(t).normalize();
    const normal = new THREE.Vector3(0, 0, 1);
    let binormal = new THREE.Vector3().crossVectors(tangent, normal).normalize();
    if (binormal.lengthSq() < 0.001) {
      binormal.set(1, 0, 0);
    }

    const vLeft = new THREE.Vector3().addVectors(pt, binormal.clone().multiplyScalar(halfWidth));
    const vRight = new THREE.Vector3().addVectors(pt, binormal.clone().multiplyScalar(-halfWidth));

    positions.push(vLeft.x, vLeft.y, vLeft.z);
    positions.push(vRight.x, vRight.y, vRight.z);

    const ribbonNormal = new THREE.Vector3().crossVectors(binormal, tangent).normalize();
    normals.push(ribbonNormal.x, ribbonNormal.y, ribbonNormal.z);
    normals.push(ribbonNormal.x, ribbonNormal.y, ribbonNormal.z);

    uvs.push(0, t);
    uvs.push(1, t);
  }

  for (let i = 0; i < segments; i++) {
    const a = i * 2;
    const b = i * 2 + 1;
    const c = (i + 1) * 2;
    const d = (i + 1) * 2 + 1;
    indices.push(a, c, b);
    indices.push(b, c, d);
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
  geometry.setAttribute("normal", new THREE.Float32BufferAttribute(normals, 3));
  geometry.setAttribute("uv", new THREE.Float32BufferAttribute(uvs, 2));
  geometry.setIndex(indices);
  geometry.computeVertexNormals();
  return geometry;
}

export function buildLanyardSplineCurve(
  crimpPos: THREE.Vector3,
  neckApex: THREE.Vector3,
  strapSpreadX: number = 4.8
): THREE.CatmullRomCurve3 {
  const leftNeck = new THREE.Vector3(-strapSpreadX * 0.55, neckApex.y - 0.4, 0.15);
  const rightNeck = new THREE.Vector3(strapSpreadX * 0.55, neckApex.y - 0.4, 0.15);
  const midY = (neckApex.y + crimpPos.y) * 0.5;
  const leftMid = new THREE.Vector3(-strapSpreadX * 0.38 + crimpPos.x * 0.3, midY + 0.3, 0.6 + crimpPos.z * 0.3);
  const rightMid = new THREE.Vector3(strapSpreadX * 0.38 + crimpPos.x * 0.3, midY + 0.3, 0.6 + crimpPos.z * 0.3);
  const leftLower = new THREE.Vector3(crimpPos.x - 0.25, crimpPos.y + 1.2, crimpPos.z + 0.15);
  const rightLower = new THREE.Vector3(crimpPos.x + 0.25, crimpPos.y + 1.2, crimpPos.z + 0.15);

  return new THREE.CatmullRomCurve3(
    [
      crimpPos.clone(),
      leftLower,
      leftMid,
      leftNeck,
      neckApex.clone(),
      rightNeck,
      rightMid,
      rightLower,
      crimpPos.clone(),
    ],
    false,
    "centripetal"
  );
}

export function updateRibbonMeshGeometry(
  ribbonMesh: THREE.Mesh,
  crimpPos: THREE.Vector3,
  neckApex: THREE.Vector3,
  strapWidth: number,
  strapSpreadX: number = 4.8
) {
  const curve = buildLanyardSplineCurve(crimpPos, neckApex, strapSpreadX);
  const newGeo = createRibbonGeometry(curve, 100, strapWidth);
  if (ribbonMesh.geometry) {
    ribbonMesh.geometry.dispose();
  }
  ribbonMesh.geometry = newGeo;
}

export interface BuiltModelResult {
  rootGroup: THREE.Group;
  cardAssemblyGroup: THREE.Group;
  lanyardGroup: THREE.Group;
  hardwareGroup: THREE.Group;
  holderGroup: THREE.Group;
  cardGroup: THREE.Group;
  ribbonMesh: THREE.Mesh;
  crimpAttachmentOffset: THREE.Vector3;
  strapWidth: number;
  strapSpreadX: number;
  neckApex: THREE.Vector3;
}

export async function buildCompleteIDCardAndLanyard(
  card: StandaloneCardData,
  lanyard: StandaloneLanyardData,
  hardware: StandaloneHardwareData
): Promise<BuiltModelResult> {
  const rootGroup = new THREE.Group();
  const cardAssemblyGroup = new THREE.Group();
  const lanyardGroup = new THREE.Group();
  const hardwareGroup = new THREE.Group();
  const holderGroup = new THREE.Group();
  const cardGroup = new THREE.Group();

  // Generate textures asynchronously
  const frontCanvas = await generateCardFrontCanvas(card);
  const backCanvas = await generateCardBackCanvas(card);
  const lanyardCanvas = generateLanyardFabricCanvas(lanyard);
  const fabricNormalCanvas = generateFabricNormalCanvas();

  const frontTexture = new THREE.CanvasTexture(frontCanvas);
  frontTexture.colorSpace = THREE.SRGBColorSpace;
  frontTexture.needsUpdate = true;
  frontTexture.minFilter = THREE.LinearFilter;
  frontTexture.magFilter = THREE.LinearFilter;

  const backTexture = new THREE.CanvasTexture(backCanvas);
  backTexture.colorSpace = THREE.SRGBColorSpace;
  backTexture.needsUpdate = true;
  backTexture.minFilter = THREE.LinearFilter;
  backTexture.magFilter = THREE.LinearFilter;

  const lanyardTexture = new THREE.CanvasTexture(lanyardCanvas);
  lanyardTexture.wrapS = THREE.RepeatWrapping;
  lanyardTexture.wrapT = THREE.RepeatWrapping;
  lanyardTexture.repeat.set(4, 1);
  lanyardTexture.colorSpace = THREE.SRGBColorSpace;
  lanyardTexture.needsUpdate = true;

  const fabricNormalTexture = new THREE.CanvasTexture(fabricNormalCanvas);
  fabricNormalTexture.wrapS = THREE.RepeatWrapping;
  fabricNormalTexture.wrapT = THREE.RepeatWrapping;
  fabricNormalTexture.repeat.set(16, 2);

  // Hardware Finishes
  const metalMaterial = new THREE.MeshStandardMaterial({
    color: 0xdfdfdf,
    metalness: 0.95,
    roughness: 0.15,
  });

  // 1. CR80 Vertical ID Card (54mm x 85.6mm)
  const cardW = 5.4;
  const cardH = 8.56;
  const cardThick = 0.08;
  const cardShape = createRoundedRectShape(cardW, cardH, 0.3);
  const cardGeometry = new THREE.ExtrudeGeometry(cardShape, {
    depth: cardThick,
    bevelEnabled: true,
    bevelSegments: 2,
    steps: 1,
    bevelSize: 0.02,
    bevelThickness: 0.02,
  });
  cardGeometry.center();

  const cardSideMat = new THREE.MeshStandardMaterial({
    color: 0x18181b,
    roughness: 0.4,
    metalness: 0.1,
  });

  const cardFrontMat = new THREE.MeshStandardMaterial({
    map: frontTexture,
    roughness: 0.2,
    metalness: 0.02,
    side: THREE.FrontSide,
    polygonOffset: true,
    polygonOffsetFactor: -2,
    polygonOffsetUnits: -2,
  });

  const cardBackMat = new THREE.MeshStandardMaterial({
    map: backTexture,
    roughness: 0.2,
    metalness: 0.02,
    side: THREE.FrontSide,
    polygonOffset: true,
    polygonOffsetFactor: -2,
    polygonOffsetUnits: -2,
  });

  const frontPlane = new THREE.Mesh(new THREE.PlaneGeometry(cardW - 0.04, cardH - 0.04), cardFrontMat);
  frontPlane.position.z = cardThick / 2 + 0.025;
  frontPlane.castShadow = true;
  cardGroup.add(frontPlane);

  const backPlane = new THREE.Mesh(new THREE.PlaneGeometry(cardW - 0.04, cardH - 0.04), cardBackMat);
  backPlane.rotation.y = Math.PI;
  backPlane.position.z = -(cardThick / 2 + 0.025);
  backPlane.castShadow = true;
  cardGroup.add(backPlane);

  const cardCore = new THREE.Mesh(cardGeometry, cardSideMat);
  cardCore.castShadow = true;
  cardGroup.add(cardCore);

  // 2. Card Holder / Protective Case Frame (Sleek border frame with zero surface collision)
  const holderW = 6.0;
  const holderH = 9.8;
  const holderThick = 0.3;
  const holderRadius = 0.45;
  const hw = holderW / 2;
  const hh = holderH / 2;

  const holderShape = new THREE.Shape();
  holderShape.moveTo(-hw + holderRadius, -hh);
  holderShape.lineTo(hw - holderRadius, -hh);
  holderShape.quadraticCurveTo(hw, -hh, hw, -hh + holderRadius);
  holderShape.lineTo(hw, hh - 0.8);
  holderShape.lineTo(1.5, hh - 0.8);
  holderShape.quadraticCurveTo(1.5, hh, 1.2, hh);
  holderShape.lineTo(-1.2, hh);
  holderShape.quadraticCurveTo(-1.5, hh, -1.5, hh - 0.8);
  holderShape.lineTo(-hw, hh - 0.8);
  holderShape.lineTo(-hw, -hh + holderRadius);
  holderShape.quadraticCurveTo(-hw, -hh, -hw + holderRadius, -hh);

  // Slot hole for clip
  const hole = new THREE.Path();
  const holeY = hh - 0.45;
  hole.moveTo(-0.6, holeY - 0.2);
  hole.lineTo(0.6, holeY - 0.2);
  hole.quadraticCurveTo(0.7, holeY - 0.2, 0.7, holeY);
  hole.quadraticCurveTo(0.7, holeY + 0.2, 0.6, holeY + 0.2);
  hole.lineTo(-0.6, holeY + 0.2);
  hole.quadraticCurveTo(-0.7, holeY + 0.2, -0.7, holeY);
  hole.quadraticCurveTo(-0.7, holeY - 0.2, -0.6, holeY - 0.2);
  holderShape.holes.push(hole);

  // Full Window Cutout wide enough so it never covers the card surface
  const winCutout = new THREE.Path();
  const winW = (cardW + 0.1) / 2;
  const winH = (cardH + 0.1) / 2;
  winCutout.moveTo(-winW, -0.4 - winH);
  winCutout.lineTo(winW, -0.4 - winH);
  winCutout.lineTo(winW, -0.4 + winH);
  winCutout.lineTo(-winW, -0.4 + winH);
  winCutout.closePath();
  holderShape.holes.push(winCutout);

  const holderGeo = new THREE.ExtrudeGeometry(holderShape, {
    depth: holderThick,
    bevelEnabled: true,
    bevelSegments: 2,
    steps: 1,
    bevelSize: 0.02,
    bevelThickness: 0.02,
  });
  holderGeo.center();

  // Translucent Acrylic Frame
  const holderMat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 0.35,
    roughness: 0.12,
    metalness: 0.05,
    depthWrite: false,
  });

  const holderMesh = new THREE.Mesh(holderGeo, holderMat);
  holderMesh.position.y = 0.4;
  holderMesh.castShadow = false;
  holderMesh.receiveShadow = false;
  holderGroup.add(holderMesh);

  // 3. Metal Hardware (Swivel Lobster Clasp, D-Ring)
  const clipBaseY = 5.2;
  const hookGroup = new THREE.Group();
  const hookOffsetY = clipBaseY;

  const ringMesh = new THREE.Mesh(new THREE.TorusGeometry(0.35, 0.07, 16, 24), metalMaterial);
  ringMesh.position.set(0, hookOffsetY + 0.1, 0);
  hookGroup.add(ringMesh);

  const barrelMesh = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.18, 0.45, 16), metalMaterial);
  barrelMesh.position.set(0, hookOffsetY + 0.55, 0);
  hookGroup.add(barrelMesh);

  const hookCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0, hookOffsetY + 0.75, 0),
    new THREE.Vector3(0.25, hookOffsetY + 1.1, 0),
    new THREE.Vector3(0.35, hookOffsetY + 1.5, 0),
    new THREE.Vector3(0.1, hookOffsetY + 1.9, 0),
    new THREE.Vector3(-0.3, hookOffsetY + 1.7, 0),
    new THREE.Vector3(-0.35, hookOffsetY + 1.3, 0),
    new THREE.Vector3(-0.15, hookOffsetY + 0.95, 0),
  ]);
  const hookTube = new THREE.Mesh(new THREE.TubeGeometry(hookCurve, 32, 0.08, 12, false), metalMaterial);
  hookGroup.add(hookTube);

  const dRingY = hookOffsetY + 2.05;
  const dRingGeo = new THREE.TorusGeometry(0.48, 0.08, 16, 24);
  dRingGeo.scale(1.2, 0.6, 1);
  const dRingMesh = new THREE.Mesh(dRingGeo, metalMaterial);
  dRingMesh.position.set(0, dRingY, 0);
  hookGroup.add(dRingMesh);

  const crimpMesh = new THREE.Mesh(new THREE.BoxGeometry(0.85, 0.45, 0.35), metalMaterial);
  crimpMesh.position.set(0, dRingY + 0.35, 0);
  hookGroup.add(crimpMesh);

  hardwareGroup.add(hookGroup);

  cardAssemblyGroup.add(cardGroup);
  cardAssemblyGroup.add(holderGroup);
  cardAssemblyGroup.add(hardwareGroup);

  const crimpAttachmentOffset = new THREE.Vector3(0, dRingY + 0.45, 0);

  // 4. Dynamic Lanyard Ribbon Mesh
  // High anchor point so only bottom half of the strap is visible inside the canvas
  const strapMat = new THREE.MeshStandardMaterial({
    map: lanyardTexture,
    normalMap: fabricNormalTexture,
    normalScale: new THREE.Vector2(0.6, 0.6),
    roughness: 0.85,
    metalness: 0.05,
    side: THREE.DoubleSide,
  });

  const strapWidth = 0.75;
  const strapSpreadX = 4.8;
  const neckApex = new THREE.Vector3(0, 10.5, -0.4);

  const initialCrimpPos = new THREE.Vector3(0, -3.2 + crimpAttachmentOffset.y, 0);
  const initialCurve = buildLanyardSplineCurve(initialCrimpPos, neckApex, strapSpreadX);
  const ribbonMesh = new THREE.Mesh(createRibbonGeometry(initialCurve, 100, strapWidth), strapMat);
  ribbonMesh.castShadow = true;
  ribbonMesh.receiveShadow = true;
  lanyardGroup.add(ribbonMesh);

  rootGroup.add(cardAssemblyGroup);
  rootGroup.add(lanyardGroup);

  return {
    rootGroup,
    cardAssemblyGroup,
    lanyardGroup,
    hardwareGroup,
    holderGroup,
    cardGroup,
    ribbonMesh,
    crimpAttachmentOffset,
    strapWidth,
    strapSpreadX,
    neckApex,
  };
}

/* ==========================================================================
   6. CLEAN INTERACTIVE 3D ID CARD COMPONENT
   ========================================================================== */

export interface Interactive3DIDCardProps {
  cardConfig?: Partial<StandaloneCardData>;
}

export const Interactive3DIDCard: React.FC<Interactive3DIDCardProps> = ({
  cardConfig: customConfigProp,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const modelRef = useRef<BuiltModelResult | null>(null);
  const physicsRef = useRef<CardPhysicsEngine>(new CardPhysicsEngine());
  const clockRef = useRef<THREE.Clock>(new THREE.Clock());
  const reqIdRef = useRef<number | null>(null);

  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [isOverCard, setIsOverCard] = useState<boolean>(false);

  // Merged Card Config from default
  const cardData: StandaloneCardData = {
    ...DEFAULT_ID_CARD_CONFIG,
    ...customConfigProp,
  };

  const lanyardData: StandaloneLanyardData = {
    text: cardData.lanyardText || "AGNAYA MUMTAZUL • UNIVERSITAS NUSA PUTRA • SOFTWARE ENGINEER • ",
    textColor: "#FFFFFF",
    strapColor: cardData.lanyardColor || "#09090b",
    secondaryColor: cardData.lanyardSecondaryColor || cardData.accentColor || "#3b82f6",
    width: 20,
    pattern: "repeating_text",
    showSafetyBuckle: false,
  };

  const hardwareData: StandaloneHardwareData = {
    holderType: "acrylic_clear",
    holderColor: "#FFFFFF",
    hardwareFinish: "chrome_silver",
    useRetractableReel: false,
  };

  // Setup Three.js Canvas
  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const width = container.clientWidth || 540;
    const height = container.clientHeight || 560;

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera positioned & framed specifically so only HALF of the lanyard is in view
    // The card is prominently centered, and the top half of the lanyard drops out of frame above.
    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 1000);
    camera.position.set(0, -1.8, 17.5);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, preserveDrawingBuffer: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    container.innerHTML = "";
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.06;
    controls.minDistance = 9;
    controls.maxDistance = 35;
    // Target the center of the card
    controls.target.set(0, -1.8, 0);
    controlsRef.current = controls;

    // Ground Shadow Plane
    const shadowPlane = new THREE.Mesh(
      new THREE.PlaneGeometry(60, 60),
      new THREE.ShadowMaterial({ opacity: 0.16 })
    );
    shadowPlane.rotation.x = -Math.PI / 2;
    shadowPlane.position.y = -10.5;
    shadowPlane.receiveShadow = true;
    scene.add(shadowPlane);

    // Responsive Resize
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width: w, height: h } = entry.contentRect;
        if (w > 0 && h > 0 && cameraRef.current && rendererRef.current) {
          cameraRef.current.aspect = w / h;
          cameraRef.current.updateProjectionMatrix();
          rendererRef.current.setSize(w, h);
        }
      }
    });
    resizeObserver.observe(container);

    // Main Render & Physics Loop
    const animate = () => {
      reqIdRef.current = requestAnimationFrame(animate);
      const dt = clockRef.current.getDelta();
      const physics = physicsRef.current;

      physics.update(dt);

      const model = modelRef.current;
      if (model) {
        const { cardAssemblyGroup, cardGroup, ribbonMesh, crimpAttachmentOffset, neckApex, strapWidth, strapSpreadX } = model;
        if (cardAssemblyGroup) {
          cardAssemblyGroup.position.copy(physics.position);
          cardAssemblyGroup.rotation.copy(physics.rotation);

          const crimpWorldPos = cardAssemblyGroup.localToWorld(crimpAttachmentOffset.clone());
          if (ribbonMesh) {
            updateRibbonMeshGeometry(ribbonMesh, crimpWorldPos, neckApex, strapWidth, strapSpreadX);
          }
        }
        if (cardGroup) {
          cardGroup.position.x = physics.cardJiggle.x * 0.1;
          cardGroup.position.y = physics.cardJiggle.y * 0.1;
          cardGroup.position.z = 0;
        }
      }

      if (controlsRef.current) {
        controlsRef.current.update();
      }

      if (rendererRef.current && sceneRef.current && cameraRef.current) {
        rendererRef.current.render(sceneRef.current, cameraRef.current);
      }
    };
    animate();

    return () => {
      resizeObserver.disconnect();
      if (reqIdRef.current) cancelAnimationFrame(reqIdRef.current);
      renderer.dispose();
      container.innerHTML = "";
    };
  }, []);

  // Studio Lighting
  useEffect(() => {
    if (!sceneRef.current) return;
    const scene = sceneRef.current;
    const existing = scene.children.filter((c) => c instanceof THREE.Light);
    existing.forEach((l) => scene.remove(l));

    scene.add(new THREE.AmbientLight(0xffffff, 1.1));
    
    // Front Key Light
    const key = new THREE.DirectionalLight(0xffffff, 1.2);
    key.position.set(6, 12, 16);
    key.castShadow = true;
    scene.add(key);

    // Front Soft Fill Light
    const fill = new THREE.DirectionalLight(0xf0f9ff, 0.8);
    fill.position.set(-8, 4, 14);
    scene.add(fill);

    // Back Key Light (so the back of the card is also crystal clear when rotated)
    const backLight = new THREE.DirectionalLight(0xffffff, 1.2);
    backLight.position.set(0, 6, -16);
    scene.add(backLight);

    // Rim / Edge Accent (Harsh Desk Lamp effect)
    const rim = new THREE.DirectionalLight(0xffeedd, 0.8);
    rim.position.set(0, 14, 0);
    scene.add(rim);
  }, []);

  // Build / Rebuild 3D Model
  useEffect(() => {
    let isCancelled = false;
    async function loadModel() {
      if (!sceneRef.current) return;
      const scene = sceneRef.current;
      if (modelRef.current?.rootGroup) {
        scene.remove(modelRef.current.rootGroup);
      }
      const built = await buildCompleteIDCardAndLanyard(cardData, lanyardData, hardwareData);
      if (!isCancelled) {
        modelRef.current = built;
        scene.add(built.rootGroup);
        physicsRef.current.reset();
      }
    }
    loadModel();
    return () => {
      isCancelled = true;
    };
  }, [
    cardData.name,
    cardData.role,
    cardData.avatarUrl,
    cardData.frontDesignUrl,
    cardData.backDesignUrl,
    cardData.accentColor,
    cardData.companyName,
    cardData.idNumber,
    cardData.lanyardText,
  ]);

  // Pointer Drag Interaction on ID Card
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!containerRef.current || !cameraRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(new THREE.Vector2(x, y), cameraRef.current);

    const cardAssembly = modelRef.current?.cardAssemblyGroup;
    if (cardAssembly) {
      const intersects = raycaster.intersectObjects(cardAssembly.children, true);
      if (intersects.length > 0) {
        const camDir = new THREE.Vector3();
        cameraRef.current.getWorldDirection(camDir);
        physicsRef.current.startDrag(intersects[0].point, camDir);
        setIsDragging(true);
        if (controlsRef.current) controlsRef.current.enabled = false;
        try {
          (e.target as HTMLElement).setPointerCapture(e.pointerId);
        } catch {}
      }
    }
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!containerRef.current || !cameraRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(new THREE.Vector2(x, y), cameraRef.current);

    if (physicsRef.current.isDragging) {
      const planeIntersect = new THREE.Vector3();
      raycaster.ray.intersectPlane(physicsRef.current.dragPlane, planeIntersect);
      if (planeIntersect) {
        physicsRef.current.updateDrag(planeIntersect);
      }
      return;
    }

    const root = modelRef.current?.rootGroup;
    if (root) {
      const intersects = raycaster.intersectObjects(root.children, true);
      setIsOverCard(intersects.length > 0);
    }
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (physicsRef.current.isDragging) {
      physicsRef.current.endDrag();
      setIsDragging(false);
      if (controlsRef.current) controlsRef.current.enabled = true;
      try {
        (e.target as HTMLElement).releasePointerCapture(e.pointerId);
      } catch {}
    }
  };

  return (
    <div className="relative w-full h-[520px] sm:h-[580px] rounded-3xl bg-zinc-950/70 border border-zinc-800/80 shadow-2xl overflow-hidden select-none touch-none">
      {/* 3D WebGL Canvas */}
      <div
        ref={containerRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        className={`w-full h-full ${
          isDragging ? "cursor-grabbing" : isOverCard ? "cursor-grab" : "cursor-default"
        }`}
      />
    </div>
  );
};
