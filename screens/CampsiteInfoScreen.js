
import RenderCampsite from '../features/campsites/RenderCampsite';
// Navigation and route props are available via react.  route will be used to ge the navigation params passed to the navigation function back in the directory screen.
// route: destructuring the route prop in the parameter list of the CampsiteInfoScreen function.
// const campsite: destructuring to get the campsite param from the route.params object, which is where all the params for this route are located.
// return RenderCampsite: inside the campsite prop of the RenderCampsite, setting the campsite prop = to the campsite data received through route.params.

const CampsiteInfoScreen = ({ route }) => {
    const { campsite } = route.params;
    return <RenderCampsite campsite={campsite} />;
};

export default CampsiteInfoScreen;