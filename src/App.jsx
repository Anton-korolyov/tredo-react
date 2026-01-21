import { useEffect, useState } from "react";
import { useAuth } from "./auth/AuthContext";
import { useTranslation } from "react-i18next";

import Header from "./components/Header";
import CardGrid from "./components/CardGrid";
import CardForm from "./components/CardForm";
import Popup from "./components/Popup";
import Modal from "./components/Modal";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import ScrollTopButton from "./components/ui/ScrollTopButton";
import {
  getCards,
  createCard,
  updateCard,
  deleteCard,
} from "./services/cardService";

function App() {
  const { user } = useAuth();
  const { i18n } = useTranslation();

  // ================= DATA =================
  const [items, setItems] = useState([]);

  // ================= FILTERS =================
  const [search, setSearch] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [cityId, setCityId] = useState("");

  // ================= PAGINATION =================
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  // ================= UI =================
  const [mode, setMode] = useState(null);
  const [authMode, setAuthMode] = useState(null);
  const [currentItem, setCurrentItem] = useState(null);
  const [pendingAction, setPendingAction] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 🔝 SCROLL TOP
  const [showTop, setShowTop] = useState(false);

  // ================= RTL / LTR =================
  useEffect(() => {
    document.documentElement.dir = i18n.language === "he" ? "rtl" : "ltr";
  }, [i18n.language]);

  // ================= LOAD =================
  const loadCards = async (reset = false) => {
    try {
      const res = await getCards({
        page: reset ? 1 : page,
        search,
        categoryId,
        cityId,
      });

      setItems((prev) => (reset ? res.items : [...prev, ...res.items]));
      setHasMore(res.items.length > 0);
      setPage((prev) => (reset ? 2 : prev + 1));
    } catch (err) {
      console.error("GET cards error:", err);
      setError("Failed to load cards");
    } finally {
      setLoading(false);
    }
  };

  // ================= INITIAL =================
  useEffect(() => {
    loadCards(true);
    // eslint-disable-next-line
  }, []);

  // ================= FILTER CHANGE =================
  useEffect(() => {
    setLoading(true);
    setPage(1);
    setHasMore(true);
    loadCards(true);
    // eslint-disable-next-line
  }, [search, categoryId, cityId]);

  // ✅ ONE SCROLL LISTENER: button + infinite scroll
  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const fullHeight = document.body.offsetHeight;

      // 🔝 show scroll-to-top
      setShowTop(scrollTop > 300);

      // ♾ infinite scroll
      if (
        windowHeight + scrollTop >= fullHeight - 300 &&
        hasMore &&
        !loading
      ) {
        loadCards(false);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [hasMore, loading, page]); // page оставил как у тебя

  // ================= CRUD =================
  const handleAddClick = () => {
    if (!user) {
      setPendingAction("add");
      setAuthMode("register");
      return;
    }
    setCurrentItem(null);
    setMode("add");
  };

  const handleAddSave = async (data) => {
    const newCard = await createCard(data);
    setItems((prev) => [newCard, ...prev]);
    setMode(null);
  };

  const handleUpdate = async (data) => {
    const updated = await updateCard(currentItem.id, data);
    setItems((prev) => prev.map((i) => (i.id === updated.id ? updated : i)));
    setMode(null);
    setCurrentItem(null);
  };

  const handleDelete = async () => {
    if (!window.confirm("Delete this card?")) return;
    await deleteCard(currentItem.id);
    setItems((prev) => prev.filter((i) => i.id !== currentItem.id));
    setMode(null);
    setCurrentItem(null);
  };

  // ================= AUTH =================
  const handleAuthSuccess = () => {
    setAuthMode(null);
    if (pendingAction === "add") {
      setMode("add");
      setPendingAction(null);
    }
  };

  const handleAuthCancel = () => {
    setAuthMode(null);
    setPendingAction(null);
  };

  if (error) {
    return <p style={{ padding: 20, color: "red" }}>{error}</p>;
  }

  return (
    <>
      <Header
        onAdd={handleAddClick}
        onLogin={() => setAuthMode("login")}
        onRegister={() => setAuthMode("register")}
        search={search}
        categoryId={categoryId}
        cityId={cityId}
        onSearchChange={setSearch}
        onCategoryChange={setCategoryId}
        onCityChange={setCityId}
      />

      <main>
        <div className="cards-container">
          <CardGrid
            items={items}
            onSelect={(item) => {
              setCurrentItem(item);
              setMode("view");
            }}
          />

          {loading && (
            <p style={{ textAlign: "center", padding: 20 }}>Loading...</p>
          )}
        </div>
      </main>

      {/* 🔝 SCROLL TO TOP BUTTON */}
       <ScrollTopButton show={showTop} />

      {/* VIEW */}
      {mode === "view" && currentItem && (
        <Modal
          item={currentItem}
          isOwner={user && user.id === currentItem.ownerId}
          onClose={() => {
            setMode(null);
            setCurrentItem(null);
          }}
          onEdit={() => setMode("edit")}
          onDelete={handleDelete}
        />
      )}

      {/* ADD / EDIT */}
      {(mode === "add" || mode === "edit") && user && (
        <Popup onClose={() => setMode(null)}>
          <CardForm
            initialData={mode === "edit" ? currentItem : {}}
            onSave={mode === "edit" ? handleUpdate : handleAddSave}
            onCancel={() => setMode(null)}
          />
        </Popup>
      )}

      {/* LOGIN */}
      {authMode === "login" && (
        <Popup onClose={handleAuthCancel}>
          <LoginForm onSuccess={handleAuthSuccess} onCancel={handleAuthCancel} />
        </Popup>
      )}

      {/* REGISTER */}
      {authMode === "register" && (
        <Popup onClose={handleAuthCancel}>
          <RegisterForm
            onCancel={handleAuthCancel}
            onSwitchToLogin={() => setAuthMode("login")}
          />
        </Popup>
      )}
    </>
  );
}

export default App;
