import React from 'react';

import { PagesConfig } from '../../types/pagesConfig';
import { Redirect, Route, Switch } from 'react-router-dom';
import RouteToLayout from './components/RouteToLayout';
import { useIsAuthenticated } from '../../hooks/useIsAuthenticated';
import LinkResolver, { linkResolverRootUrl } from './components/LinkResolver/LinkResolver';
import { DefaultRoutes } from '../../types/routing';
import SurveyPage from './components/SurveyPage';
import { LoadingPlaceholder, containerClassName } from 'case-web-ui';
import clsx from 'clsx';


interface PagesProps {
  config?: PagesConfig;
  onOpenExternalPage: (url: string) => void;
}

const Pages: React.FC<PagesProps> = (props) => {
  const isAuth = useIsAuthenticated();

  if (!props.config) {
    // Loading page:
    return <div className={clsx(containerClassName, 'my-3')}>
      <LoadingPlaceholder color='secondary' minHeight='60vh' />
    </div>
  }

  const defaultRoutes: DefaultRoutes = props.config.defaultRoutes ? props.config.defaultRoutes : {
    auth: '/home',
    unauth: '/home',
    studyPage: '/home',
    surveyPage: '/surveys',
  }

  return (
    <div>
      <Switch >
        {props.config.pages.map(pageConfig => {
          return <RouteToLayout
            key={pageConfig.path}
            path={pageConfig.path}
            pageConfig={pageConfig}
            defaultRoutes={defaultRoutes}
          />
        })}
        <Route path={defaultRoutes.surveyPage + '/:studyKey/:surveyKey'} render={() => <SurveyPage defaultRoutes={defaultRoutes} />} />
        <Route path={linkResolverRootUrl} render={() => <LinkResolver defaultRoutes={defaultRoutes} />} />,
        <Redirect to={isAuth ? defaultRoutes.auth : defaultRoutes.unauth} />
      </Switch>
    </div>
  );
};

export default Pages;
