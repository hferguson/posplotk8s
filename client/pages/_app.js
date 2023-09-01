import 'bootstrap/dist/css/bootstrap.css';
import '../components/MapPanel.css';
import '../components/PlottingMap.css';
import '../components/bootstrap-social.css';
import '../components/fontawesome.css';
import './page.css';
import buildClient from '../api/build-client';

/**
 * The purpose of this file is to apply a bootstrap "wrapper" around each page in this
 * pages directory.  Effectively the value of Component is our page (i.e. index.js). NextJS
 * looks for global CSS within _app.js which is guaranteed to load for every page called.
 * Later I did all the authentication calls through here.
 */

/*export default ({ Component, pageProps}) => {
    return <Component {...pageProps} />
}; */

const AppComponent = ({ Component, pageProps, currentUser}) => {
    //console.log("Top level App Component");
    return (
        <div className="pageBody">
            <Component currentUser={currentUser}  {...pageProps} />
        </div>
    )
};

AppComponent.getInitialProps = async (appContext) => {
    //console.log("AppComponent Get Initial Props");
    const context = appContext.ctx;
    try  {
      console.log("Calling initial userdata");
      const client = buildClient(context);
      const {data} = await client.get('/api/oauth/userdata/jwt');
      console.log(data);
      let pageProps = {};
      if (appContext.Component.getInitialProps) {
            console.log("Calling child getInitialProps");
          pageProps = await appContext.Component.getInitialProps(context, client, data);
      }
      
      // Note to self. The main difference between what we do here and what we did in MicroServices
      // project is that here, data doesn't have a top level object called currentUser, it is the JWT 
      // payload itself.
      return {
        pageProps,
        currentUser: data
      }
    } catch (err) {
      console.log(err);
      console.error(err.message);
    }
   
  
    return {};
  };
  
  export default AppComponent;