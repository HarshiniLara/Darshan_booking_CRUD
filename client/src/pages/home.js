import { AdminNavBar, UserNavBar } from "../components/navbar";
import "./home.css";

const UserHome = () => {
    return(
        <div>
            <UserNavBar />
            <FrontPage />
        </div>
    );
}

const AdminHome = () => {
    return(
        <div>
            <AdminNavBar />
            <FrontPage />
        </div>
    );
}

const FrontPage = () => {
    return(
        <div className="home">
            <h3>Welcome to HolyQueue!</h3>
            <p>We make it easy for you to book your Dharshan at your favorite temple or shrine. No more waiting in long queues or struggling to find the right time for your visit.</p>
            <h4>With HolyQueue, you can:</h4>
            <ul>
                <li>Book Dharshan from the comfort of your own home</li>
                <li>Avoid long queues and save time</li>
                <li>Get real-time updates on the slots</li>
            </ul>
            <p>Our mission is to help you connect with the divine and make your spiritual journey a little easier. We're here to support you every step of the way, whether you're a regular visitor or a first-time devotee.</p>
            <p>Start your journey with us today and experience the peace of mind that comes with knowing your Dharshan is booked and ready for you.</p>
        </div>
    );
}

export { UserHome, AdminHome };