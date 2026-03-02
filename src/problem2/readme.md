## Currency Swap App

### How to run
- **Install dependencies**: from the `src/problem2/currency-swap` directory run `npm install` or `yarn`.
- **Start the dev server**: run `npm start` or `yarn start` and open the printed URL in your browser.

### Performance improvements
- **Debounced price updates**: user input that drives price fetching is wrapped in a debounce so rapid typing does not trigger excessive network requests, improving performance and keeping the UI responsive.

### UX improvements
- **Skeleton loading states**: while prices are being fetched, skeleton placeholders are shown instead of blank space or jarring content jumps, giving clearer feedback that data is loading and making the experience feel smoother.