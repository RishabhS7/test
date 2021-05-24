import React from "react";
import { Route, Switch } from "react-router-dom";

import routes from "../routes";


class Auth extends React.Component {

    getRoutes = (routes) => {
        return routes.map( (prop, key) => {
            if (prop.layout === "/") {
                return (
                        <Route exact 
                            path={prop.layout + prop.path}
                            component={prop.component}
                            key={key}
                        />
                    );
            } else {
                console.log('= logged in ? ', this.props.isLoggedIn)
                return null;
            }
        })
    }

    render() {
        console.log('-- auth js ')
        return(
            <>
                <section>
					<Switch>{this.getRoutes(routes)}</Switch>
				</section>
            </>
        )
    }
}

export default Auth;