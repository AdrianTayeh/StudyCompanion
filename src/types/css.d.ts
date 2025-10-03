// Allow importing global CSS files as side-effect imports
declare module '*.css' {
  const content: unknown
  export default content
}
