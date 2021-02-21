import Theme from './theme'
import {
  ThemeProvider,
  createMuiTheme as createTheme,
  responsiveFontSizes,
} from '@material-ui/core/styles';
import { Route, Switch, Router } from 'react-router'
import { createBrowserHistory } from "history";
import { QueryClient, QueryClientProvider } from 'react-query'

import Subscribe from './pages/subscribe'
import NotFound from './pages/notfound'

const queryClient = new QueryClient()
const theme = responsiveFontSizes(createTheme({
  ...Theme,
}));


const App = () => {
  const customHistory = createBrowserHistory();

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <Router history={customHistory}>
          <Switch>
            <Route exact path="/" component={Subscribe} />
            <Route component={NotFound} />
          </Switch>
        </Router>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
