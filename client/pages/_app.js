import 'bootstrap/dist/css/bootstrap.css';
import '../components/PlottingMap.css';
/**
 * The purpose of this file is to apply a bootstrap "wrapper" around each page in this
 * pages directory.  Effectively the value of Component is our page (i.e. index.js). NextJS
 * looks for global CSS within _app.js which is guaranteed to load for every page called
 */
export default ({ Component, pageProps}) => {
    return <Component {...pageProps} />
};