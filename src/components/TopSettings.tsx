import "./TopSettings.scss";
import logout from "../assets/images/logout-2.svg";
import notification from "../assets/images/notification.svg";

type Props = {}

const TopSettings = (props: Props) => {
  return (
    <div className="top-bar">
        <div className="top-bar_icons">
            <div className="top-bar_icons--icon"><img src={notification} width={25} alt="Notification" /></div>
            <div className="top-bar_icons--icon"><img src={logout} width={25} alt="logout" /></div>
        </div>
    </div>
  )
}

export default TopSettings