import React from 'react';

import {LayoutConsumer} from 'contexts/layout-context';

export const withSetLayout = Component => {
  return class extends React.Component {
    render() {
      return (
        <LayoutConsumer>
          {({setLayout}) => <Component setLayout={setLayout} {...this.props} />}
        </LayoutConsumer>
      );
    }
  };
};

class LayoutWrapper extends React.PureComponent {
  componentWillMount() {
    const {layout, setLayout} = this.props;
    setLayout(layout);
  }

  render() {
    return this.props.children;
  }
}

const BaseLayout = withSetLayout(LayoutWrapper);

const PrivateLayout = ({children}) => (
  <BaseLayout layout="private">{children}</BaseLayout>
);

const PublicLayout = ({children}) => (
  <BaseLayout layout="public">{children}</BaseLayout>
);

const StaticLayout = ({children}) => (
  <BaseLayout layout="static">{children}</BaseLayout>
);

export {PrivateLayout, PublicLayout, StaticLayout};
