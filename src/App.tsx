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
  {
    id: 6,
    title: "Splendor",
    players: "2-4",
    duration: "30 min",
    difficulty: "Easy",
    summary: "Collect gems and build a merchant empire.",
    detail:
      "Purchase gem tokens to acquire cards and attract nobles. Race to reach prestige points while managing limited resources strategically.",
    image: "https://images.unsplash.com/photo-1627362180015-1982d196f2fd?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 7,
    title: "Dominion",
    players: "2-4",
    duration: "30 min",
    difficulty: "Medium",
    summary: "Build the best deck of cards in this deck-building classic.",
    detail:
      "Use your hand to buy better cards for your deck. Exploit card combos and strategic sequencing to outpace opponents. Endless card variety.",
    image: "https://cf.geekdo-images.com/3nNhLDr5PAzXPDMBKBERBw__medium/img/h1YUG--aMH0pLKlrDhc4-V_Pp4U=/fit-in/500x500/filters:strip_webp()/pic1217529.jpg",
  },
  {
    id: 8,
    title: "Carcassonne",
    players: "2-5",
    duration: "30-45 min",
    difficulty: "Easy-Medium",
    summary: "Build a medieval landscape tile by tile.",
    detail:
      "Draw and place tiles to form cities, roads, and monasteries. Strategic placement and follower scoring create engaging spatial puzzles.",
    image: "https://upload.wikimedia.org/wikipedia/en/3/38/Carcassonne_base_game_box.jpg",
  },
  {
    id: 9,
    title: "7 Wonders",
    players: "2-7",
    duration: "45-60 min",
    difficulty: "Medium",
    summary: "Build civilizations in parallel with simultaneous card drafting.",
    detail:
      "Draft cards to develop military, scientific, and commercial strengths while building your civilization's Wonder. Quick gameplay despite depth.",
    image: "https://cf.geekdo-images.com/yfYEscsyvtKH-RkByLGr1A__medium/img/K1HaLcFYnVtEyQdPrmqBpM2a6sE=/fit-in/500x500/filters:strip_webp()/pic1642849.jpg",
  },
  {
    id: 10,
    title: "Agricola",
    players: "1-5",
    duration: "30-150 min",
    difficulty: "Medium",
    summary: "Build and manage a sustainable farm over 14 rounds.",
    detail:
      "Place workers on action spaces to develop crops, livestock, and family. Balance expansion with resource management for long-term success.",
    image: "https://cf.geekdo-images.com/MYJxWZHy_ysqM1VHG48EJw__medium/img/Xq7gGaVYb-Yk8sYJvvPJJU6_m74=/fit-in/500x500/filters:strip_webp()/pic1406785.jpg",
  },
  {
    id: 11,
    title: "Codenames",
    players: "2-8",
    duration: "15 min",
    difficulty: "Easy",
    summary: "Give one-word clues to reveal secret agents.",
    detail:
      "Teams compete to identify agents by interpreting cryptic clues. Creative wordplay and deduction make every game unpredictable and fun.",
    image: "https://cf.geekdo-images.com/W3sfMfH84s5Z9kDMGI-98Q__medium/img/wI0wnpMjHAr5AXr6w5mVZ_oe7s0=/fit-in/500x500/filters:strip_webp()/pic3483769.jpg",
  },
  {
    id: 12,
    title: "Wingspan",
    players: "1-5",
    duration: "40-60 min",
    difficulty: "Easy-Medium",
    summary: "Build your bird sanctuary with beautiful cards and engines.",
    detail:
      "Play bird cards to create habitats and build card-playing engines. Learn about real species while competing for conservation goals.",
    image: "https://cf.geekdo-images.com/x0uA5EjJe3c9gVwXdmLmSg__medium/img/C0xOXCpkwSEPBUFJ8gA0RrVTkgg=/fit-in/500x500/filters:strip_webp()/pic4458123.jpg",
  },
  {
    id: 13,
    title: "Everdell",
    players: "1-4",
    duration: "40-50 min",
    difficulty: "Easy",
    summary: "Banish sad trees and build a magical woodland community.",
    detail:
      "Gather resources in an enchanted forest and play creature cards to grow your grove. Whimsical art meets elegant worker placement.",
    image: "https://cf.geekdo-images.com/4wzYVN4_SkOGWWf9qNMx3g__medium/img/Sw2zzHarNXokCXxPr8pUNzB0hMk=/fit-in/500x500/filters:strip_webp()/pic3918151.jpg",
  },
  {
    id: 14,
    title: "Ticket to Ride: Europe",
    players: "2-5",
    duration: "45-60 min",
    difficulty: "Easy",
    summary: "Race across European railways claiming iconic routes.",
    detail:
      "Strategic railway expansion from revised, expanded map. More blocking opportunities and tunnel routes add depth to the classic formula.",
    image: "https://cf.geekdo-images.com/8dAn_0Z_Tb-rU9tWkVgpwQ__medium/img/K8Fa0KqvdXgN8qCT-RKWdAx3wJg=/fit-in/500x500/filters:strip_webp()/pic1224405.jpg",
  },
  {
    id: 15,
    title: "One Night Ultimate Werewolf",
    players: "3-10",
    duration: "10 min",
    difficulty: "Easy",
    summary: "Rapid-fire social deduction bluffing game.",
    detail:
      "Identify werewolves in real-time debate with role abilities changing each round. Perfect filler for groups wanting quick thrills and laughs.",
    image: "https://cf.geekdo-images.com/8R-cblR4Q0CjVlRbcNXAIw__medium/img/0d20-E1-tQUVqX7j7yJlvW06EQ=/fit-in/500x500/filters:strip_webp()/pic1734135.jpg",
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

  const collectionGames = useMemo(
    () => gameData.filter((game) => collection.includes(game.id)),
    [collection]
  );

  const baseGames = view === "collection" ? collectionGames : gameData;

  const displayGames = useMemo(
    () =>
      baseGames.filter((game) => {
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
    [baseGames, searchQuery, filterType]
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

