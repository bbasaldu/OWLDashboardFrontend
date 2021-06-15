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
            const newChart = action.payload
            const foundChartIndex = state.playerChartData.findIndex(c => c.type === newChart.type)
            if(foundChartIndex === -1){
                state.playerChartData.push(newChart)
            }
            else{
                state.playerChartData[foundChartIndex] = newChart
            }
        },
        clearPlayerChartData(state){
            state.playerChartData = []
        }
    }
})
export const playerActions = playerSlice.actions;
export default playerSlice.reducer;