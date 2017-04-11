import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { incrementBudget, decrementBudget } from '../actions/budget.js';

class BudgetCategory extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {

    let actualSpending = 200;

    return (
      <div className="budgetCategory">
        {this.props.budgetcategory.name}
        <div>
        Budget Goal: {this.props.budgetcategory.goalvalue}
        <button onClick={(e) => { this.props.handleIncrement(); } }> + </button> 
        <button onClick={(e) => { this.props.handleDecrement(); } }> - </button>
        </div>
        <div>
        Spent this Month: {this.props.budgetcategory.actualvalue}
        </div>
        <br />
      </div>

    )
  }
}

const mapStateToProps = (state) => {
  return {
    budget: state.budget
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleIncrement: () => { dispatch(incrementBudget()); },
    handleDecrement: () => { dispatch(decrementBudget()); }
  };
};

export default connect (mapStateToProps, mapDispatchToProps) (BudgetCategory);