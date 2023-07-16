import { Home } from "./home/Home";
import { Chat } from "./chat/chat-main-section/Chat";
import { MeetingSection } from "./meeting/meeting-section/MeetingSection";
import { RouterContextProvider, useRouterContext } from "../contexts/route-context";

const componentViews = [
    {
        url: '/',
        component: <Home />
    },
    {
        url: 'meetingId',
        component: <MeetingSection />
    },

]

function NavigateComponent() {
    const { component } = useRouterContext();

    function generateComponent() {
        return componentViews.find(item => {
            const urlSearchParams = new URLSearchParams(window.location.search);
            return urlSearchParams.has(component.url)
        });
    }

    const view = generateComponent();
    console.log(view);

    return (
        <>

            {/* {view.component} */}

            <Home/>
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