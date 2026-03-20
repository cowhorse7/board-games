import { useMemo, useState } from "react";
import "./App.css";
import Header from "./components/Header";

type Game = {
  id: number;
  title: string;
  players: string;
  duration: string;
  difficulty: string;
  summary: string;
  detail: string;
  image: string;
};

const gameData: Game[] = [
  {
    id: 1,
    title: "Catan",
    players: "3-4",
    duration: "60-120 min",
    difficulty: "Medium",
    summary: "Settle, trade, and build your island civilization.",
    detail:
      "Players collect resources to construct roads, settlements, and cities. Balance trading with rivals and optimize development cards.",
    image: "https://www.boardgamequest.com/wp-content/uploads/2013/04/Settlers-of-Catan.jpg",
  },
  {
    id: 2,
    title: "Ticket to Ride",
    players: "2-5",
    duration: "30-60 min",
    difficulty: "Easy",
    summary: "Claim train routes across a growing map.",
    detail:
      "Connect cities with your trains, complete destination tickets, and block opponents. Simple rules with strong strategic depth.",
    image: "https://assets.nintendo.com/image/upload/c_fill,w_1200/q_auto:best/f_auto/dpr_2.0/store/software/switch/70010000077436/326d4b297eccf8fe878ccd5bf37fa4fb1ccaf580fdd3e40b3c6cca57496bf966",
  },
  {
    id: 3,
    title: "Gloomhaven",
    players: "1-4",
    duration: "60-120 min",
    difficulty: "Hard",
    summary: "Campaign-driven dungeon crawl with evolving stories.",
    detail:
      "Choose heroes, build decks, manage stamina, and unlock long-term campaign rewards. High replayability and strong narrative progression.",
    image: "https://cephalofair.com/cdn/shop/articles/Gloomhaven_Cover_-_Title_PREFERRED_4096x.jpg?v=1685591987",
  },
  {
    id: 4,
    title: "Azul",
    players: "2-4",
    duration: "30-45 min",
    difficulty: "Easy-Medium",
    summary: "Draft tiles and decorate a palace wall.",
    detail:
      "Take turns drafting colored tiles, complete patterns, avoid penalties, and score points by careful planning.",
    image: "https://upload.wikimedia.org/wikipedia/en/2/23/Picture_of_Azul_game_box.jpg",
  },
  {
    id: 5,
    title: "Pandemic",
    players: "2-4",
    duration: "45-60 min",
    difficulty: "Medium",
    summary: "Cooperative disease control around the world.",
    detail:
      "Work as a team to treat outbreaks, share knowledge, and find cures before infection spreads globally. Requires coordination and adaptability.",
    image: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/622440/header.jpg?t=1726473051",
  },
];

function App() {
  const [profileName, setProfileName] = useState("");
  const [profileDraft, setProfileDraft] = useState("");
  const [collection, setCollection] = useState<number[]>([]);
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [view, setView] = useState<"all" | "collection">("all");

  const collectionGames = useMemo(
    () => gameData.filter((game) => collection.includes(game.id)),
    [collection]
  );

  const displayGames = view === "collection" ? collectionGames : gameData;

  const addOrRemove = (game: Game) => {
    setCollection((current) =>
      current.includes(game.id)
        ? current.filter((id) => id !== game.id)
        : [...current, game.id]
    );
  };

  const createProfile = () => {
    if (!profileDraft.trim()) return;
    setProfileName(profileDraft.trim());
    setProfileDraft("");
  };

  const signOut = () => {
    setProfileName("");
    setCollection([]);
    setView("all");
    setSelectedGame(null);
  };

  return (
    <main>
      <Header />

      <section className="profile-panel">
        {profileName ? (
          <>
            <p>Welcome, <strong>{profileName}</strong>!</p>
            <button className="ghost" onClick={signOut}>
              Sign out
            </button>
            <p>Saved games: {collection.length}</p>
          </>
        ) : (
          <div className="profile-form">
            <input
              value={profileDraft}
              onChange={(e) => setProfileDraft(e.target.value)}
              placeholder="Create profile name"
            />
            <button onClick={createProfile}>Create Profile</button>
          </div>
        )}
      </section>

      <section className="view-tabs">
        <button
          className={view === "all" ? "active" : ""}
          onClick={() => setView("all")}
        >
          All Games
        </button>
        <button
          className={view === "collection" ? "active" : ""}
          onClick={() => setView("collection")}
          disabled={!profileName}
        >
          My Collection
        </button>
      </section>

      {view === "collection" && !profileName ? (
        <p className="notice">Create a profile first to start saving games.</p>
      ) : view === "collection" && collectionGames.length === 0 ? (
        <p className="notice">No games in your collection yet. Add some from All Games.</p>
      ) : null}

      <section className="game-grid">
        {displayGames.map((game) => {
          const isSaved = collection.includes(game.id);

          return (
            <article
              key={game.id}
              className="game-card"
              onClick={() => setSelectedGame(game)}
            >
              <div className="game-image" style={{ backgroundImage: `url(${game.image})` }} />
              <div className="game-body">
                <div className="game-title-row">
                  <h2>{game.title}</h2>
                  <span className={`badge ${isSaved ? "saved" : ""}`}>
                    {isSaved ? "Saved" : "Fresh"}
                  </span>
                </div>
                <p>{game.summary}</p>
                <div className="game-meta">
                  <span>{game.players} players</span>
                  <span>{game.duration}</span>
                  <span>{game.difficulty}</span>
                </div>
                <button
                  className={`action ${isSaved ? "secondary" : "primary"}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (profileName) {
                      addOrRemove(game);
                    } else {
                      alert("Create a profile to save games.");
                    }
                  }}
                >
                  {isSaved ? "Remove" : "Save"}
                </button>
              </div>
            </article>
          );
        })}
      </section>

      {selectedGame && (
        <section className="detail-overlay" onClick={() => setSelectedGame(null)}>
          <article
            className="detail-card"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="detail-image"
              style={{ backgroundImage: `url(${selectedGame.image})` }}
            />
            <div className="detail-content">
              <h2>{selectedGame.title}</h2>
              <p className="detail-meta">
                {selectedGame.players} • {selectedGame.duration} • {selectedGame.difficulty}
              </p>
              <p>{selectedGame.detail}</p>
              <div className="detail-actions">
                <button onClick={() => setSelectedGame(null)}>Close</button>
                <button
                  className="primary"
                  onClick={() => {
                    addOrRemove(selectedGame);
                  }}
                >
                  {collection.includes(selectedGame.id) ? "Remove from Collection" : "Add to Collection"}
                </button>
              </div>
            </div>
          </article>
        </section>
      )}
    </main>
  );
}

export default App;

