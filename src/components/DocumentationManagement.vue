<template>
  <div class="tic-tac-toe">
    <h1 class="title">Tic Tac Toe</h1>
    <div class="board">
      <div v-for="(cell, index) in cells" :key="index" class="cell" @click="makeMove(index)">
        {{ cell }}
      </div>
    </div>
    <button v-if="winner || isFull" @click="resetGame">Restart Game</button>
    <p v-if="winner">{{ winner }} wins!</p>
    <p v-else-if="isFull">It's a draw!</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cells: Array(9).fill(null),
      currentPlayer: 'X',
      winner: null,
    };
  },
  computed: {
    isFull() {
      return this.cells.every(cell => cell !== null);
    }
  },
  methods: {
    makeMove(index) {
      if (!this.cells[index] && !this.winner) {
        this.$set(this.cells, index, this.currentPlayer);
        this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
        this.checkWinner();
      }
    },
    checkWinner() {
      const lines = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
        [0, 4, 8], [2, 4, 6]             // diagonals
      ];
      lines.forEach((line) => {
        const [a, b, c] = line;
        if (this.cells[a] && this.cells[a] === this.cells[b] && this.cells[a] === this.cells[c]) {
          this.winner = this.cells[a];
        }
      });
    },
    resetGame() {
      this.cells = Array(9).fill(null);
      this.currentPlayer = 'X';
      this.winner = null;
    }
  }
};
</script>

<style scoped>
.tic-tac-toe {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.title {
  font-size: 24px;
  margin-bottom: 20px;
}
.board {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  width: 300px;
  margin-bottom: 20px;
}
.cell {
  width: 100px;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f0f0f0;
  font-size: 36px;
  cursor: pointer;
}
</style>
