import { useMemo, useState } from "react";
import "./App.css";
import Header from "./components/Header";

type Game = {
  id: number;
  title: string;
  category: string;
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
    category: "Strategy",
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
    category: "Family",
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
    category: "Adventure",
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
    category: "Abstract",
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
    category: "Cooperative",
    players: "2-4",
    duration: "45-60 min",
    difficulty: "Medium",
    summary: "Cooperative disease control around the world.",
    detail:
      "Work as a team to treat outbreaks, share knowledge, and find cures before infection spreads globally. Requires coordination and adaptability.",
    image: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/622440/header.jpg?t=1726473051",
  },
  {
    id: 6,
    title: "Splendor",
    category: "Strategy",
    players: "2-4",
    duration: "30 min",
    difficulty: "Easy",
    summary: "Collect gems and build a merchant empire.",
    detail:
      "Purchase gem tokens to acquire cards and attract nobles. Race to reach prestige points while managing limited resources strategically.",
    image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/376680/capsule_616x353.jpg?t=1742483733",
  },
  {
    id: 7,
    title: "Dominion",
    category: "Deck-Building",
    players: "2-4",
    duration: "30 min",
    difficulty: "Medium",
    summary: "Build the best deck of cards in this deck-building classic.",
    detail:
      "Use your hand to buy better cards for your deck. Exploit card combos and strategic sequencing to outpace opponents. Endless card variety.",
    image: "https://img.pastemagazine.com/wp-content/uploads/2022/06/21074637/dominion-card-game-main.jpg",
  },
  {
    id: 8,
    title: "Carcassonne",
    category: "Tile-Laying",
    players: "2-5",
    duration: "30-45 min",
    difficulty: "Easy-Medium",
    summary: "Build a medieval landscape tile by tile.",
    detail:
      "Draw and place tiles to form cities, roads, and monasteries. Strategic placement and follower scoring create engaging spatial puzzles.",
    image: "https://boardgamestrategy.blog/wp-content/uploads/2016/12/carcassone2.jpg?w=640",
  },
  {
    id: 9,
    title: "7 Wonders",
    category: "Strategy",
    players: "2-7",
    duration: "45-60 min",
    difficulty: "Medium",
    summary: "Build civilizations in parallel with simultaneous card drafting.",
    detail:
      "Draft cards to develop military, scientific, and commercial strengths while building your civilization's Wonder. Quick gameplay despite depth.",
    image: "https://b1803394.smushcdn.com/1803394/wp-content/uploads/2020/08/7-wonders-review-header-990x557.jpg?lossy=1&strip=1&webp=1",
  },
  {
    id: 10,
    title: "Agricola",
    category: "Worker-Placement",
    players: "1-5",
    duration: "30-150 min",
    difficulty: "Medium",
    summary: "Build and manage a sustainable farm over 14 rounds.",
    detail:
      "Place workers on action spaces to develop crops, livestock, and family. Balance expansion with resource management for long-term success.",
    image: "https://www.gaminglib.com/cdn/shop/products/agricola-the-15th-anniversary-edition-746664.jpg?v=1753955273&width=300",
  },
  {
    id: 11,
    title: "Codenames",
    category: "Party",
    players: "2-8",
    duration: "15 min",
    difficulty: "Easy",
    summary: "Give one-word clues to reveal secret agents.",
    detail:
      "Teams compete to identify agents by interpreting cryptic clues. Creative wordplay and deduction make every game unpredictable and fun.",
    image: "https://www.thebearandthefox.com/wp-content/uploads/2020/11/Codenames-Game-Review-650x488.jpg",
  },
  {
    id: 12,
    title: "Wingspan",
    category: "Engine-Building",
    players: "1-5",
    duration: "40-60 min",
    difficulty: "Easy-Medium",
    summary: "Build your bird sanctuary with beautiful cards and engines.",
    detail:
      "Play bird cards to create habitats and build card-playing engines. Learn about real species while competing for conservation goals.",
    image: "https://www.moxboardinghouse.com/cdn/shop/files/2f47c01cWingspan-Mox-Boarding-House-Seattle.jpg?v=1753817274",
  },
  {
    id: 13,
    title: "Everdell",
    category: "Worker-Placement",
    players: "1-4",
    duration: "40-50 min",
    difficulty: "Easy",
    summary: "Banish sad trees and build a magical woodland community.",
    detail:
      "Gather resources in an enchanted forest and play creature cards to grow your grove. Whimsical art meets elegant worker placement.",
    image: "https://assets.nintendo.com/image/upload/q_auto/f_auto/store/software/switch/70010000056698/8014e07ef1fb7f6cd0e9bec07ff2c9a4df456f1b606b3d812bd735020432001b",
  },
  {
    id: 14,
    title: "Ticket to Ride: Europe",
    category: "Family",
    players: "2-5",
    duration: "45-60 min",
    difficulty: "Easy",
    summary: "Race across European railways claiming iconic routes.",
    detail:
      "Strategic railway expansion from revised, expanded map. More blocking opportunities and tunnel routes add depth to the classic formula.",
    image: "https://www.boardgamequest.com/wp-content/uploads/2013/12/Ticket-To-Ride-Europe.jpg",
  },
  {
    id: 15,
    title: "One Night Ultimate Werewolf",
    category: "Party",
    players: "3-10",
    duration: "10 min",
    difficulty: "Easy",
    summary: "Rapid-fire social deduction bluffing game.",
    detail:
      "Identify werewolves in real-time debate with role abilities changing each round. Perfect filler for groups wanting quick thrills and laughs.",
    image: "https://www.boardgamesdallas.com/cdn/shop/products/pic1809823_580x.jpg?v=1588350344",
  },
];

function App() {
  const [profileName, setProfileName] = useState("");
  const [profileDraft, setProfileDraft] = useState("");
  const [collection, setCollection] = useState<number[]>([]);
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [view, setView] = useState<"all" | "collection">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState<"all" | "title" | "players" | "duration">("all");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const collectionGames = useMemo(
    () => gameData.filter((game) => collection.includes(game.id)),
    [collection]
  );

  const baseGames = view === "collection" ? collectionGames : gameData;
  const categories = useMemo(
    () => ["All", ...Array.from(new Set(gameData.map((game) => game.category)))],
    []
  );

  const displayGames = useMemo(
    () =>
      baseGames.filter((game) => {
        if (selectedCategory !== "All" && game.category !== selectedCategory) {
          return false;
        }

        const query = searchQuery.toLowerCase();
        if (!query) return true;

        switch (filterType) {
          case "title":
            return game.title.toLowerCase().includes(query);
          case "players":
            return game.players.toLowerCase().includes(query);
          case "duration":
            return game.duration.toLowerCase().includes(query);
          case "all":
          default:
            return (
              game.title.toLowerCase().includes(query) ||
              game.players.toLowerCase().includes(query) ||
              game.duration.toLowerCase().includes(query)
            );
        }
      }),
    [baseGames, searchQuery, filterType, selectedCategory]
  );

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
      <Header
        profileName={profileName}
        profileDraft={profileDraft}
        onProfileDraftChange={setProfileDraft}
        onCreateProfile={createProfile}
        onSignOut={signOut}
      />

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

      <section className="category-tabs">
        {categories.map((category) => (
          <button
            key={category}
            className={selectedCategory === category ? "active" : ""}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </section>

      <section className="search-section">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by title, players, or time..."
          className="search-input"
        />
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value as "all" | "title" | "players" | "duration")}
          className="filter-dropdown"
        >
          <option value="all">All Fields</option>
          <option value="title">Title</option>
          <option value="players">Players</option>
          <option value="duration">Duration</option>
        </select>
      </section>

      {view === "collection" && !profileName ? (
        <p className="notice">Create a profile first to start saving games.</p>
      ) : view === "collection" && collectionGames.length === 0 ? (
        <p className="notice">No games in your collection yet. Add some from All Games.</p>
      ) : displayGames.length === 0 ? (
        <p className="notice">No games match your search.</p>
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
                    {isSaved ? "Saved" : game.category}
                  </span>
                </div>
                <p>{game.summary}</p>
                <div className="game-meta">
                  <span>{game.category}</span>
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

