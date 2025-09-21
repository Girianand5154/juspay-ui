# Fix World Map in Revenue by Location Tile

## Issue
The world map in the "Revenue by Location" tile doesn't look like a proper world map - it uses simple blob shapes instead of recognizable continents.

## Plan Steps

1. **Analyze current implementation** - Review the existing SVG world map code in Dashboard.js and DashboardWithDarkMode.js
2. **Create accurate world map SVG** - Replace the basic blob shapes with proper continent outlines
3. **Update Dashboard.js** - Replace the world map section with the new accurate implementation
4. **Update DashboardWithDarkMode.js** - Apply the same fix to the dark mode version
5. **Position location dots correctly** - Ensure New York, San Francisco, Sydney, and Singapore dots are placed accurately
6. **Test both light and dark modes** - Verify the map looks good in both themes
7. **Verify responsive design** - Ensure the map scales properly on different screen sizes

## Files to Edit
- src/components/Dashboard.js
- src/components/DashboardWithDarkMode.js

## Current Status
- [ ] Step 1: Analyze current implementation
- [ ] Step 2: Create accurate world map SVG
- [ ] Step 3: Update Dashboard.js
- [ ] Step 4: Update DashboardWithDarkMode.js
- [ ] Step 5: Position location dots correctly
- [ ] Step 6: Test both light and dark modes
- [ ] Step 7: Verify responsive design
