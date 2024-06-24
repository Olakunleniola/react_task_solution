import React, { useEffect, useState, useContext } from "react";
import { Card } from "../components/Card";
import MkdSDK from "../utils/MkdSDK";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { AuthContext } from "../authContext";

const ItemType = {
  CARD: "card",
};

const DraggableCard = ({ id, photo, title, like, username, index, moveCard }) => {
  const [{ isDragging }, drag] = useDrag({
    type: ItemType.CARD,
    item: { id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: ItemType.CARD,
    hover: (item) => {
      if (item.index !== index) {
        moveCard(item.index, index);
        item.index = index;
      }
    },
  });

  const opacity = isDragging ? 0.5 : 1;

  return (
    <div ref={(node) => drag(drop(node))} style={{ opacity }}>
      <Card id={id} photo={photo} title={title} like={like} username={username} />
    </div>
  );
};

const AdminDashboardPage = () => {
  const sdk = new MkdSDK();
  const [videoData, setVideoData] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [canNext, setCanNext] = useState(true)
  const [canPrevious, setCanPrevious] = useState(false)
  const {state, dispatch} = useContext(AuthContext)
  useEffect(() => {
    fetchVideoData(1)
  }, []);

  const fetchVideoData = async (page) => {
    try {
      const data = await sdk.callRestAPI({payload:{}, page: page, limit:10}, "PAGINATE");
      setVideoData(data.list);
      setTotalPages(data.num_pages);
      setPage(data.page);
      setCanPrevious(data.page > 1);
      setCanNext(data.page < data.num_pages);    
    } catch (err) {
      console.log(err);
    }
  }


  const moveCard = (fromIndex, toIndex) => {
    const updatedData = [...videoData];
    const [movedItem] = updatedData.splice(fromIndex, 1);
    updatedData.splice(toIndex, 0, movedItem);
    setVideoData(updatedData);
  };

  const goNext = () => {
    if (canNext) {
      fetchVideoData(page + 1);
    }
  };

  const goBack = () => {
    if (canPrevious) {
      fetchVideoData(page - 1);
    }
  };

  const handleLogOut = () => {
    dispatch({type: "LOGOUT",})
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="main">
      
        {/* Top and Logout Button Container */}
        <div className="container-2">
          <div className="app">APP</div>

          <button className="logout-button" onClick={handleLogOut}>
              <span className="icons-left">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="6" r="4" stroke="currentColor" strokeWidth="1.5"></circle>
                  <path d="M20 17.5C20 19.9853 20 22 12 22C4 22 4 19.9853 4 17.5C4 15.0147 7.58172 13 12 13C16.4183 13 20 15.0147 20 17.5Z" stroke="currentColor" strokeWidth="1.5"></path>
                </svg>
              </span>
              <span className="label logout">Logout</span>
          </button>
        </div>

        {/* Title */}
        <div className="title-time">
          <div className="profile">Today’s leaderboard</div>
          <div className="time">
            <div className="may-2022">30 May 2022</div>
            <div className="ellipse-21"></div>
            <div className="type">
              <span className="submissions-open">Submissions OPEN</span>
            </div>
            <div className="ellipse-20"></div>
            <div className="container-11">11:34</div>
          </div>
        </div>

        {/* Table Header */}
        <div className="header-table">
          <div className="flex qt">
            <span className="container-10">#</span>
            <span className="title-10">Title</span>
          </div>
          <div className="jst ht">
            <span className="author">Author</span>
            <div className="jst">
              <span className="most-liked">Most Liked</span>
              <svg className="vector-10" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M7 10L12 15L17 10"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Drag and Drop Context */}
        <div className="item">
          {videoData &&
            videoData.map((data, idx) => {
              const { id, photo, title, like, username } = data;
              return (
                <DraggableCard
                  key={id}
                  id={id}
                  photo={photo}
                  title={title}
                  like={like}
                  username={username}
                  index={idx}
                  moveCard={moveCard}
                />
              );
            })}
        </div>

        {/* Navigation */}
        <div className="navigate">
          <button className="nav-button" disabled={!canPrevious} onClick={goBack}>
            <svg className="nav-icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" fill="currentColor" stroke="currentColor" strokeWidth="102.4">
              <path d="M768 903.232l-50.432 56.768L256 512l461.568-448 50.432 56.768L364.928 512z" fill="currentColor"></path>
            </svg>
            <span>Prev</span>
          </button>
          <span className="page">{page} of {totalPages}</span>
          <button className="nav-button" disabled={!canNext} onClick={goNext}>
            <span>Next</span>
            <svg className="nav-icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" fill="currentColor" stroke="currentColor" strokeWidth="102.4">
              <path d="M256 120.768L306.432 64 768 512l-461.568 448L256 903.232 659.072 512z" fill="currentColor"></path>
            </svg>
          </button>
        </div>

      </div>
    </DndProvider>
  );
};

export default AdminDashboardPage;
