class ShoppingList extends React.Component{
    render(){ //개별 컴포넌트는 props라는 매개변수를 받아오고 render 함수를 통해 표시할 뷰 계층 구조를 반환
        return(
            <div className="shopping-list">
                <h1>Shopping List for {this.props.name}</h1>
                <ul>
                    <li>Instagram</li>
                    <li>WhatsApp</li>
                    <li>Oculus</li>
                </ul>
            </div>
        )
    }
}

//Square에 value prop을 전달하기 위해
class Board extends React.Component{
    constructor(props){ //Board에 생성자를 추가하고 9개의 사각형에 해당하는 9개의 null 배열을 초기 state로 설정
        super(props);
        this.state = {
            squares : Array(9).fill(null),
            xIsNext : true,
        };
    }

    handleClick(i){
        const squares = this.state.squares.slice();

        // 누군가가 승리하거나 Square가 이미 채워졌다면 Board의 handleClick 함수가 클릭을 무시
        if (calculateWinner(squares) || squares[i]) { 
            return;
        }
        
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            squares : squares,
            xIsNext : !this.state.xIsNext, //값 뒤집기
        });
    }

    //Board에서 Square로 함수를 전달하고 Square는 사각형을 클릭할 때 함수를 호출할 것
    renderSquare(i){//Square는 이제 빈 사각형에 'X', 'O', 또는 null인 value prop을 받습니다.
        return <Square value={this.state.squares[i]} onClick={() => this.handleClick(i)} />;
    }

    render() {
        // const status = 'Next player: '+(this.state.xIsNext ? 'X' : 'O');
        const winner = calculateWinner(this.state.squares);
        let status;
        if (winner) {
          status = 'Winner: ' + winner;
        } else {
          status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        }

        return (
          <div>
            <div className="status">{status}</div>
            <div className="board-row">
              {this.renderSquare(0)}
              {this.renderSquare(1)}
              {this.renderSquare(2)}
            </div>
            <div className="board-row">
              {this.renderSquare(3)}
              {this.renderSquare(4)}
              {this.renderSquare(5)}
            </div>
            <div className="board-row">
              {this.renderSquare(6)}
              {this.renderSquare(7)}
              {this.renderSquare(8)}
            </div>
          </div>
        );
      }

}

//값을 표시하기 위해
// class Square extends React.Component{
//     //다음 단계로 Square 컴포넌트를 클릭한 것을 “기억하게” 만들어 “X” 표시를 채워 넣으려고 합니다. 
//     //무언가를 “기억하기”위해 component는 state를 사용합니다.
//     // constructor(props){ // 생성자, state 초기화 진행
//     //     super(props);
//     //     this.state = {
//     //         value : null,
//     //     };
//     // }
    
//     render(){
//         return(
//             //Square를 클릭하면 Board에서 넘겨받은 onClick 함수가 호출된다.
//             <button className="square" onClick={() => this.props.onClick()}>
//                 {this.props.value}
//             </button>
//         );
//     }
// }
// 함수버전
function Square(props){
    return <button className="square" onClick={props.onClick()}>
        {props.value}
    </button>
};

//도우미 함수
function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Game />);
