import ClothesSection from "../ClothesSection/ClothesSection";
import SideBar from "../SideBar/SideBar";
import "./Profile.css";

function Profile({
  onCardClick,
  clothingItems,
  weatherData,
  handleAddClick,
  handleEditProfileClick,
  currentUser,
  onLogout,
  isLoggedIn,
  onCardLike,
}) {
  return (
    <div className="profile">
      <section className="profile__sidebar">
        <SideBar
          handleEditProfileClick={handleEditProfileClick}
          onSignOut={onLogout}
          currentUser={currentUser}
        />
      </section>
      <section className="profile__clothes-section">
        <ClothesSection
          onCardClick={onCardClick}
          clothingItems={clothingItems}
          weatherData={weatherData}
          handleAddClick={handleAddClick}
          // currentUser={currentUser}
          isLoggedIn={isLoggedIn}
          onCardLike={onCardLike}
        />
      </section>
    </div>
  );
}

export default Profile;
