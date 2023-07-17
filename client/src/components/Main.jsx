import { Home } from "./home/Home";
import { Chat } from "./chat/chat-main-section/Chat";
import { MeetingSection } from "./meeting/meeting-section/MeetingSection";
import { RouterContextProvider, useRouterContext } from "../contexts/route-context";
import { ErrorPage } from "./error-pages/ErrorPage";


const availableURLs = [
    '/',
];

const componentViews = [
    {
        url: '/',
        component: <Home />
    },
    {
        url: 'meetingId',
        component: <MeetingSection />
    },

];

function NavigateComponent() {
    const { component } = useRouterContext();

    function generateComponent() {


        if (!checkIfUrlExists(window.location.pathname)) {
            return {
                component: <ErrorPage errorCode={404} />
            }
        }

        if (!checkIfQueryParamsExist('?')) {
            return {
                url: '/',
                component: <Home />
            };
        }


        const view = validate_With_Available_QueryParams(componentViews)
        if (!view) {
            return {
                component: <ErrorPage errorCode={404} />
            }
        }

        return view;
    }


    function checkIfQueryParamsExist(param) {
        const index = window.location.search.indexOf(param);

        return (index !== -1);
    }



    function checkIfUrlExists(params) {
        return availableURLs.includes(params);
    }


    function validate_With_Available_QueryParams(queryParamsList) {
        return queryParamsList.find(item => {
            const urlSearchParams = new URLSearchParams(component.url);
            console.log(urlSearchParams.get(item.url));

            return (urlSearchParams.get(item.url) !== null);
        });

    }

    const view = generateComponent();
    console.log(view);

    return (
        <>

            {view.component}

            {/* <Home /> */}
        </>
    )
}


export function Main() {

    return (
        <RouterContextProvider>
            <NavigateComponent />
        </RouterContextProvider>
    );
}