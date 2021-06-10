import { createSlice } from "@reduxjs/toolkit";

const playerSlice = createSlice({
    name: 'player',
    initialState: {players: [], currentPlayer: null, playerChartData: []},
    reducers: {
        setPlayer(state, action){
            state.currentPlayer = action.payload
        },
        setPlayers(state, action){
            state.players = action.payload
        },
        setPlayerChartData(state, action){
            state.playerChartData = action.payload
        }
    }
})
export const playerActions = playerSlice.actions;
export default playerSlice.reducer;