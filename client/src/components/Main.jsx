import { Home } from "./home/Home";
import { MeetingSection } from "./meeting/meeting-section/MeetingSection";
import {
    RouterContextProvider,
    useRouterContext
} from "../contexts/route-context";
import { ErrorPage } from "./error-pages/ErrorPage";
import { queryParamsConstants } from "../constants/query-params-constants";

const availableURLs = ["/"];

const componentViews = [
    {
        url: queryParamsConstants.BASE_URL,
        component: <Home />
    },
    {
        url: queryParamsConstants.MEETING_ID_PARAM,
        component: <MeetingSection />
    },
    {
        url: queryParamsConstants.ACTION_AND_MEETING_PARAM,
        component: <MeetingSection />
    }
];

function NavigateComponent() {
    const { component } = useRouterContext();

    function generateComponent() {
        if (!checkIfUrlExists(window.location.pathname)) {
            return {
                component: <ErrorPage errorCode={404} />
            };
        }

        if (!checkIfQueryParamsExist("?")) {
            return {
                url: "/",
                component: <Home />
            };
        }

        const view = check_equlity_of_query_params(componentViews);
        if (!view) {
            return {
                component: <ErrorPage errorCode={404} />
            };
        }

        return view;
    }

    function checkIfQueryParamsExist(param) {
        const index = window.location.search.indexOf(param);

        return index !== -1;
    }

    function checkIfUrlExists(params) {
        return availableURLs.includes(params);
    }

    function check_equlity_of_query_params(queryParamsList) {

        const urlParams = new URLSearchParams(component.url);
        const params = {
            keys: '',
            values: ''
        };
        let index = 0;
        const queryParamsArray = urlParams.entries();

        for (const val of queryParamsArray) {

            let separator = '';
            if (index > 0) {
                separator = '&';
            }
            params.keys += separator + val[0];
            params.values += separator + val[1];

            index++;
        }


        return queryParamsList.find(item => {
            const temp = params.values.split('&');
            if (params.keys === queryParamsConstants.ACTION_AND_MEETING_PARAM) {

                if (temp[0] !== 'joinMeeting' || temp[1] == '') {
                    return false;
                }
               
            }
            else if (params.keys === queryParamsConstants.MEETING_ID_PARAM) {

                if (temp[0] == '') {
                    return false;
                }
            }
            return (item.url === params.keys);
        });
    }

    const view = generateComponent();

    return (
        <>
            {view.component}

            {/* <Home /> */}
        </>
    );
}

export function Main() {
    return (
        <RouterContextProvider>
            <NavigateComponent />
        </RouterContextProvider>
    );
}
