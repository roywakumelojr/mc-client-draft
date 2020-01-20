import React, { useState, useEffect, useCallback } from 'react';
import { withAuth, SecureRoute } from '@okta/okta-react';
import { Switch } from 'react-router-dom';

import Layout from '../Layout';
import Project from '../Project/Project';
import ProjectListView from '../ProjectListView';

export default withAuth(({ auth }) => {
  const [authState, setAuthState] = useState(null);
  const { isAuthenticated, logout, getAccessToken } = auth;
  const checkAuthentication = useCallback(async () => {
    const authenticated = await isAuthenticated();
    if (authenticated !== authState) {
      setAuthState(authenticated);
    }
  }, [authState, isAuthenticated]);

  useEffect(() => {
    checkAuthentication();
  });

  const invokeOktaLogout = async () => {
    localStorage.clear();
    logout('/');
  };

  return authState === null ? null : (
    <Layout>
      <Switch>
        <SecureRoute path="/project" component={Project} />
        <SecureRoute
          path="/"
          render={props => (
            <ProjectListView
              {...props}
              logout={invokeOktaLogout}
              getAccessToken={getAccessToken}
            />
          )}
        />
      </Switch>
    </Layout>
  );
});
