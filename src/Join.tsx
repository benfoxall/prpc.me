import React, { FunctionComponent, createContext, useEffect } from "react";
import { usePeerClient } from "./lib/hooks";
import { Route } from "./routing";
import { useSelector } from "./reducers";
import { PeerServiceClient } from "./lib/peerService";
import { Debug } from "./services/Debug";
import { SyncPath } from "./services/SyncPath";
import { Chat } from "./services/Chat";
import { Trails } from "./services/Trails";
import { Cameras } from "./services/Cameras";
// import { Position } from "./services/Position";
import { Content } from "./services/Content";
import { Calculator } from "./services/Calculator";
import { Bubbles } from "./services/Bubbles";
import { Clock } from "./services/Clock";
import { SpaceInvaders } from "./services/SpaceInvaders";
import { Gps } from "./services/Gps";
import { Puck } from "./services/Puck";
import { Weather } from "./services/Weather";
import { PuckStream } from "./services/PuckStream";

let LOCAL =
  sessionStorage.getItem("LOCAL_ID") || Math.random().toString(36).slice(1);
sessionStorage.setItem("LOCAL_ID", LOCAL);

export const ClientContext = createContext<PeerServiceClient>(null);

export const Join: FunctionComponent<{ name: string }> = ({ name }) => {
  const path = useSelector((app) => app.route.path);
  const client = usePeerClient(name);

  return (
    <ClientContext.Provider value={client}>
      <SyncPath.Client />
      <main className="Join">
        <h2>
          [{name}] {path}
        </h2>

        <Route path="/">
          <Connection />
        </Route>

        <Route path="/Debug">
          <Debug.Client />
        </Route>

        <Route path="/Space">
          <SpaceInvaders.Client />
        </Route>

        <Route path="/Calculator">
          <Calculator.Client />
        </Route>

        <Route path="/Content">
          <Content.Client />
        </Route>

        <Route path="/Chat">
          <Chat.Client />
        </Route>

        <Route path="/Trails">
          <Trails.Client />
        </Route>

        <Route path="/Cameras">
          <Cameras.Client />
        </Route>

        <Route path="/Bubbles">
          <Bubbles.Client />
        </Route>

        <Route path="/Clock">
          <Clock.Client />
        </Route>

        <Route path="/Gps">
          <Gps.Client />
        </Route>

        <Route path="/Puck">
          <Puck.Client />
        </Route>

        <Route path="/PuckStream">
          <PuckStream.Client />
        </Route>

        <Route path="/Weather">
          <Weather.Client />
        </Route>

        {/* <Route path="/Position">
          <Position.Client />
        </Route> */}
      </main>
    </ClientContext.Provider>
  );
};

const Connection: FunctionComponent = () => {
  const connection = useSelector((app) => app.connection);

  return (
    <div className="JoinConnection">
      <h1>Backend: {connection.wsState ? "✅ On" : "❌ Off"}</h1>
      <h1>Peer: {connection.dcState ? "✅ On" : "❌ Off"}</h1>
    </div>
  );
};
