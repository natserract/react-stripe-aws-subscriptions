import Theme from './theme'
import {
  ThemeProvider,
  createMuiTheme as createTheme,
  responsiveFontSizes,
} from '@material-ui/core/styles';
import { Route, Switch, Router } from 'react-router'
import { createBrowserHistory } from "history";
import { QueryClient, QueryClientProvider } from 'react-query'
import { ToastProvider } from "react-toast-notifications";

import Dashboard from './pages/dashboard'
import NotFound from './pages/notfound'

const queryClient = new QueryClient()
const theme = responsiveFontSizes(createTheme({
  ...Theme,
}));


const App = () => {
  const customHistory = createBrowserHistory();

  return (
    <QueryClientProvider client={queryClient}>
      <ToastProvider placement="bottom-center">
        <ThemeProvider theme={theme}>
          <Router history={customHistory}>
            <Switch>
              <Route exact path="/" component={Dashboard} />
              <Route component={NotFound} />
            </Switch>
          </Router>
        </ThemeProvider>
      </ToastProvider>
    </QueryClientProvider>
  );
}

export default App;
