import Header from "../components/header";
import Footer from "../components/Footer";

const ToDo = ({currentUser}) => {

    return (
        <div class="pageBody">
            <Header title="To Do list"  currentUser={currentUser} ></Header>
            <ul>
                <li>For case when map points are way far away from each other, set default zoom to accommodate</li>
                <li>Maybe add a way of allowing users to edit way points</li>
                <li>Add search function</li>
                <li>Add feedback bar</li>
                <li>Implement some security/login so that users would have read-only until they sign in</li>
            </ul>
            <Footer />
        </div>
    )
}