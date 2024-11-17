/* eslint-disable @typescript-eslint/no-explicit-any */
import { defineConfig, Manifest, Plugin } from "vite";
import react from "@vitejs/plugin-react";
import { crx } from "@crxjs/vite-plugin";
import manifest from "./manifest.json";
import { Bundle } from "typescript";

const viteManifestHackIssue846: Plugin & {
  renderCrxManifest: (manifest: Manifest, bundle: Bundle) => void;
} = {
  // Workaround from https://github.com/crxjs/chrome-extension-tools/issues/846#issuecomment-1861880919.
  name: "manifestHackIssue846",
  renderCrxManifest(_manifest, bundle: Record<string, any>) {
    bundle["manifest.json"] = bundle[".vite/manifest.json"];
    bundle["manifest.json"].fileName = "manifest.json";
    delete bundle[".vite/manifest.json"];
  },
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), viteManifestHackIssue846, crx({ manifest })],
});
