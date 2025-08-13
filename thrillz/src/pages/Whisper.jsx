const Whisper = ({ whisper }) => {
  const user = whisper.users; // comes from the join

  return (
    <div className="Whisper">
      <div className="topbar">
        {console.log({user})}
        {user && (
          <>
            <img src={user.profilepic} alt={user.username} width={40} height={40} />
            <span>{user.username}</span>
            <span>{user.gmail}</span>
          </>
        )}
      </div>
      <div>{whisper.content}</div>
    </div>
  );
};
export default Whisper;