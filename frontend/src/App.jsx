import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Terms from './pages/Terms';
import Auth from './pages/Auth';
import AdminDashboard from './pages/AdminDashboard';
import SearchEvents from './pages/SearchEvents';
import EditEvent from './pages/EditEvent';
import UserProfile from './pages/UserProfile';
import CreateEvent from './pages/CreateEvent';
import EventDetails from './pages/EventDetails';
import Dashboard from './pages/Dashboard';

function App() {
    return (
        <Router>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/about" component={About} />
                <Route path="/contact" component={Contact} />
                <Route path="/privacy-policy" component={PrivacyPolicy} />
                <Route path="/terms" component={Terms} />
                <Route path="/auth" component={Auth} />
                <Route path="/admin-dashboard" component={AdminDashboard} />
                <Route path="/search-events" component={SearchEvents} />
                <Route path="/edit-event/:id" component={EditEvent} />
                <Route path="/user-profile" component={UserProfile} />
                <Route path="/create-event" component={CreateEvent} />
                <Route path="/event-details/:id" component={EventDetails} />
                <Route path="/dashboard" component={Dashboard} />
            </Switch>
        </Router>
    );
}

export default App;
