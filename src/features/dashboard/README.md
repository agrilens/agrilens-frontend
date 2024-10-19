# Dashboard Feature

This directory contains the Dashboard feature for the Agrilens application. The Dashboard displays various charts and maps to visualize plant health data.

## Structure

- `Dashboard.jsx`: Main component that composes all charts
- `Dashboard.css`: Styles for the Dashboard component
- `components/`: Directory containing individual chart components
  - `BarChart/`
  - `PieChart/`
  - `HeatMap/`
  - `GeoMap/`

## Usage

Import the Dashboard component and use it in your application:

```jsx
import Dashboard from './features/dashboard/Dashboard';

function App() {
  return (
    <div className="App">
      <Dashboard />
    </div>
  );
}
```

## Extending the Dashboard

To add a new chart:

1. Create a new directory under `components/` for your chart (e.g., `NewChart/`)
2. Implement your chart component in a file named after your chart (e.g., `NewChart.jsx`)
3. Add a corresponding CSS file if needed (e.g., `NewChart.css`)
4. Import and add your new chart component to the `Dashboard` component

Example of adding a new chart to `Dashboard.jsx`:

```jsx
import NewChart from './components/NewChart/NewChart';

// ... inside Dashboard component

// ... in the return statement
<div className="dashboard-item">
  <NewChart 
    data={newChartData} 
    title="New Chart Title" 
  />
</div>
```

## Dependencies

The Dashboard feature relies on several external libraries. These dependencies are managed through the project's `package.json` file.

Current dependencies for the Dashboard include:

- D3.js: For creating custom charts
- react-leaflet: For the GeoMap component

When adding new dependencies for the Dashboard:

1. Install the package using npm and save it to package.json:
   ```
   npm install package-name --save
   ```

2. Commit both `package.json` and `package-lock.json` to your branch.

3. Document the new dependency and its purpose in this README.

After merging branches with new dependencies, team members should run `npm install` to update their local environments.

## Data Structure

Each chart expects data in a specific format:

- BarChart: `[{ label: string, value: number }, ...]`
- PieChart: `[{ label: string, value: number }, ...]`
- HeatMap: `[{ x: string, y: string, value: number }, ...]`
- GeoMap: `[{ lat: number, lng: number, name: string, healthScore: number }, ...]`

Ensure that the data passed to each chart component adheres to these structures.

## Styling

- Chart-specific styles are in each component's CSS file (e.g., `BarChart.css`)
- Overall dashboard layout is controlled by `Dashboard.css`
- To modify the layout, adjust the CSS Grid properties in `Dashboard.css`

## Best Practices

1. Keep each chart component self-contained and reusable
2. Use consistent prop names across charts where possible (e.g., `data`, `title`)
3. When adding new charts, consider how they fit into the overall dashboard layout
4. Update this README when adding new chart types or changing data structures
5. Implement proper error handling and loading states in each chart component

## Data Management

The `Dashboard` component is responsible for managing the data for all charts. This may involve:

- Fetching data from an API
- Transforming data into the required format for each chart
- Handling loading and error states

When implementing data fetching, consider using React hooks like `useState` and `useEffect` to manage component state and side effects.

## Future Improvements

- Implement data fetching from an API
- Add interactivity between charts (e.g., filtering)
- Implement responsive design for mobile devices
- Add unit and integration tests for components
- Implement data caching or state management (e.g., Redux) for better performance

For any questions or suggestions about the Dashboard feature, please contact the Blair.