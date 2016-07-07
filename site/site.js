import {InfernoDOM, Component} from './infernowrapper';
import {data} from './data';


// Returns indexes of text matching searchText in array
// - See tests for behavior and use cases
// @text - (String) text to search from
// @searchText - (String) tex to search
export function findTextMatches(text, searchText) {
    const searchTextLength = searchText.length;
    const results = [];
    const t = text.toLowerCase();
    const s = searchText.toLowerCase();

    let nextLookUp = -1,
        pos;

    while ((pos = t.indexOf(s, nextLookUp)) !== -1) {
        results.push(pos);
        nextLookUp = pos + searchTextLength;
    }

    return results;
}


//
// @text (String) -  Original text to create highlights to
// @searchText (searchText) - word or letter to highlight
// returns array of vNodes with highlight classes
//
export function createVNodeWithHighligths(text, searchText) {
    if (searchText === '') {
        return text;
    }
    const matches = findTextMatches(text, searchText);
    const matchesLength = matches.length;

    if (matchesLength === 0) {
        return text;
    }

    const searchTextLen = searchText.length;
    const html = [];

    // Get text before matches, might be ''
    html.push(text.substring(0, matches[0]));

    for (let i = 0; i < matchesLength; i++) {
        const match = matches[i];

        html.push(<em class="match">{text.substring(match, match + searchTextLen)}</em>);
        // Text after match
        html.push(text.substring(match + searchTextLen, matches[i + 1]));
    }

    return html;
}

class Dropdown extends Component {
    constructor(props) {
        super(props);

        this.state = {
            items: this.props.items
        };

        // For storing reference to input
        this.elements = {
            input: null
        };

        this.type = this.type.bind(this);
        this.showDropdown = this.showDropdown.bind(this);
        this.hideDropdown = this.hideDropdown.bind(this);
    }

    showDropdown() {
        this.setState({
            dropdownVisible: true
        });
    }

    hideDropdown() {
        this.setState({
            dropdownVisible: false
        });
    }

    type(event) {
        const text = event.target.value;
        const doFiltering = (item) => (
            item.name.indexOf(text) > -1
        );

        this.setState({
            items: text.length === 0 ? this.props.items : this.props.items.filter(doFiltering)
        });
    }

    static renderItem(item, textToHighlight) {
        return (
            <li className="list-item" key={item.id}>
                <span key={0}>{createVNodeWithHighligths(item.name, textToHighlight)}</span>
                <span className="number" key={1}>{item.number}</span>
            </li>
        );
    }

    renderList() {
        if (!this.state.dropdownVisible) {
            return null;
        }

        const listItems = [];
        const textToHighlight = this.elements.input.value;
        const items = this.state.items;

        for (let i = 0; i < items.length; i++) {
            listItems.push(Dropdown.renderItem(items[i], textToHighlight))
        }

        return listItems;
    }

    render() {
        return (
            <div className="dropdown">
                <input type="text" onAttached={(node) => this.elements.input = node} onInput={this.type} onFocus={this.showDropdown} onBlur={this.hideDropdown} />
                <div class="example">
                    <ul className="list">
                        {this.renderList()}
                    </ul>
                </div>
            </div>
        )
    }
}


InfernoDOM.render(<Dropdown items={data} />, document.getElementById('app'));
