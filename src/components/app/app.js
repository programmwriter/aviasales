/* eslint-disable no-constant-condition */
/* eslint-disable no-await-in-loop */
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import classes from "./app.module.scss";
import logo from "../../images/Logo.svg";
import Filter from "../filter";
import Tabs from "../tabs";
import TicketList from "../ticketList";
import Loading from "../loading";
import addIdToTickets from "../../services/addIdToTickets";
import { getSearchId, getTickets } from "../../services/apiServices";
import {
  receiveSearchId,
  receiveTickets,
  throwError,
  completedLoading,
} from "../../actions";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const addIdFn = addIdToTickets();

    const fetchData = async () => {
      try {
        const responseId = await getSearchId();
        const { searchId } = responseId;

        dispatch(receiveSearchId(searchId));

        while (true) {
          const responseTikets = await getTickets(searchId);
          const { tickets, stop } = responseTikets;
          const ticketsWithId = addIdFn(tickets);
          dispatch(receiveTickets(ticketsWithId));

          if (stop) {
            dispatch(completedLoading());
            break;
          }
        }
      } catch (error) {
        dispatch(throwError(error));
      }
    };

    fetchData();
    return () => {
      dispatch(completedLoading());
    };
  }, [dispatch]);

  return (
    <div className={classes.app}>
      <div className={classes.app__header}>
        <img alt="logo" src={logo} />
        <Loading />
      </div>
      <div className={classes.app__wrapper}>
        <div className={classes.app__side}>
          <Filter />
        </div>
        <div className={classes.app__content}>
          <Tabs />
          <TicketList />
        </div>
      </div>
    </div>
  );
};

export default App;
