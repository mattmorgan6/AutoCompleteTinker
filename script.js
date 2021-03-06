
let dataJson = {}

function getJson(data) {
  let arr = []

  // Fill arr with all the genes if they are defined.
  lines = data.split("\n")
  lines.forEach(element => {
    curr = element.split(" ")
    if (curr[1] && curr[2]) {
      obj = {};
      obj["name"] = curr[1];
      obj["coordinate"] = curr[2];
      arr.push(obj);
    }
  });
  
  // newarr = arr.slice(0,95000);
  console.log(arr.length);
  return arr;
}

function readFile(input) {
  let file = input.files[0];

  let reader = new FileReader();

  reader.readAsText(file);

  reader.onload = function() {
    // console.log(reader.result);
		dataJson = getJson(reader.result);
  };

  reader.onerror = function() {
    console.log(reader.error);
  };

}


// autoComplete.js input eventListener for search results event
document.querySelector("#autoComplete").addEventListener("results", (event) => {
	console.log(event);
});


// The autoComplete.js Engine instance creator
const autoCompleteJS = new autoComplete({
	name: "Search for a gene",
	data: {
		src: async function () {
			// Loading placeholder text
			document
				.querySelector("#autoComplete")
				.setAttribute("placeholder", "Loading...");
			// Fetch External Data Source
			// const source = await fetch(
			// 	"https://raw.githubusercontent.com/mattmorgan6/AutoCompleteTinker/main/genes10.json"
			// );
			// const data = await source.json();
			const data = dataJson;
			// Post loading placeholder text
			document
				.querySelector("#autoComplete")
				.setAttribute("placeholder", "Gene Search");
			// Returns Fetched data
			return data;
		},
		key: ["name", "coordinate"],
		results: (list) => {
			// Filter duplicates
			// TODO: Currently filtering results causes a major hang! (so that's why it is commented)
			// const filteredResults = Array.from(
			// 	new Set(list.map((value) => value.match))
			// ).map((food) => {
			// 	return list.find((value) => value.match === food);
			// });

			return list;
		}
	},
	trigger: {
		event: ["input", "focus"]
	},
	placeHolder: "Search for Genes",
	searchEngine: "strict",
	highlight: true,
	maxResults: 5,
	resultItem: {
		content: (data, element) => {
			// Modify Results Item Style
			element.style = "display: flex; justify-content: space-between;";
			// Modify Results Item Content
			element.innerHTML = `<span style="text-overflow: ellipsis; white-space: nowrap; overflow: hidden;">
        ${data.match}</span>
				<span style="display: flex; align-items: center; font-size: 13px; font-weight: 100; text-transform: uppercase; color: rgba(0,0,0,.2);">
      ${data.key}</span>`;
		}
	},
	noResults: (dataFeedback, generateList) => {
		// Generate autoComplete List
		generateList(autoCompleteJS, dataFeedback, dataFeedback.results);
		// No Results List Item
		const result = document.createElement("li");
		result.setAttribute("class", "no_result");
		result.setAttribute("tabindex", "1");
		result.innerHTML = `<span style="display: flex; align-items: center; font-weight: 100; color: rgba(0,0,0,.2);">Found No Results for "${dataFeedback.query}"</span>`;
		document
			.querySelector(`#${autoCompleteJS.resultsList.idName}`)
			.appendChild(result);
	},
	onSelection: (feedback) => {
		document.querySelector("#autoComplete").blur();
		// Prepare User's Selected Value
		// const selection = feedback.selection.value[feedback.selection.key];
		const selection = feedback.selection.value
		// Render selected choice to selection div
		document.querySelector(".selection").innerHTML = JSON.stringify(selection);
		// document.querySelector(".selection").innerHTML = JSON.stringify(selection);
		// Replace Input value with the selected value
		// document.querySelector("#autoComplete").value = selection[feedback.selection.key];
		document.querySelector("#autoComplete").value = selection[feedback.selection.key];
		// Console log autoComplete data feedback
		console.log(feedback);
	}
});

// Toggle Search Engine Type/Mode
document.querySelector(".toggler").addEventListener("click", function () {
	// Holds the toggle button alignment
	const toggle = document.querySelector(".toggle").style.justifyContent;

	if (toggle === "flex-start" || toggle === "") {
		// Set Search Engine mode to Loose
		document.querySelector(".toggle").style.justifyContent = "flex-end";
		document.querySelector(".toggler").innerHTML = "Loose";
		autoCompleteJS.searchEngine = "loose";
	} else {
		// Set Search Engine mode to Strict
		document.querySelector(".toggle").style.justifyContent = "flex-start";
		document.querySelector(".toggler").innerHTML = "Strict";
		autoCompleteJS.searchEngine = "strict";
	}
});

// Toggle results list and other elements
const action = function (action) {
	const github = document.querySelector(".github-corner");
	const title = document.querySelector("h1");
	const mode = document.querySelector(".mode");
	const selection = document.querySelector(".selection");
	const footer = document.querySelector(".footer");

	if (action === "dim") {
		github.style.opacity = 1;
		title.style.opacity = 1;
		mode.style.opacity = 1;
		selection.style.opacity = 1;
		footer.style.opacity = 1;
	} else {
		github.style.opacity = 0.1;
		title.style.opacity = 0.3;
		mode.style.opacity = 0.2;
		selection.style.opacity = 0.1;
		footer.style.opacity = 0.1;
	}
};

// Toggle event for search input
// showing & hiding results list onfocus/blur
["focus", "blur"].forEach(function (eventType) {
	document
		.querySelector("#autoComplete")
		.addEventListener(eventType, function () {
			// Hide results list & show other elements
			if (eventType === "blur") {
				action("dim");
			} else if (eventType === "focus") {
				// Show results list & hide other elements
				action("light");
			}
		});
});