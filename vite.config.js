export default {
  root: 'src',
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    target: 'esnext'
  },
  server: {
    host: true,
    port: 5173,
    strictPort: true
  }
}
