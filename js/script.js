//

//

$(document).ready(() => {
	let nameInput = $("#name");
	let descriptionInput = $("#description");
	let taskContainer = $(".taskContainer");
	let getItem = (x) => {
		localStorage.getItem(x);
	};
	let setItem = (x, y) => {
		localStorage.setItem(x, y);
	};
	let removeItem = (x) => {
		localStorage.removeItem(x);
	};
	const keys = [];

	//
	let createToDo = (name, description, localStorageKey1, localStorageKey2) => {
		const createDiv = $(
			'<div class="d-flex flex-column  min-w justify-content-around align-items-center rounded-2 gap-2 p-2"></div>'
		);
		let createTitle = $("<h3 ></h3>");
		createTitle = createTitle.text(name);
		let createDescription = $("<p class='text-break text-center'></p>");
		createDescription = createDescription.text(description);
		let editTask = $(`<button type="button">edit</button>`);
		const removeTask = $('<button type="button">remove</button>');
		editTask.css("background-color", "yellow");

		createDiv.css("background-color", "#C7D6FF");
		//
		$(editTask).click(() => {
			let newTitle = prompt("task name:");
			let newDescription = prompt("task description:");
			if (newTitle === "" || newDescription === "") {
				alert("this cant be empty");
				return;
			} else if (newTitle === null || newDescription === null) {
				return;
			}
			setItem(localStorageKey1, newTitle);
			setItem(localStorageKey2, newDescription);
			createTitle = createTitle.text(newTitle);
			createDescription = createDescription.text(newDescription);
		});
		$(removeTask).click((e) => {
			let removeTarget = e.target.parentNode;
			removeTarget.remove();
			removeItem(localStorageKey1);
			removeItem(localStorageKey2);
		});

		createTitle.appendTo(createDiv);
		createDescription.appendTo(createDiv);
		editTask.appendTo(createDiv);
		removeTask.appendTo(createDiv);
		createDiv.appendTo(taskContainer);
	};
	let savedToDo = () => {
		if (parsedKeys === null ) {
			return;
		}
		let i = 0;
		for (; i < parsedKeys.length; ) {
			let key1 = parsedKeys[i];
			i++;
			let key2 = parsedKeys[i];
			createToDo(localStorage.getItem(key1), localStorage.getItem(key2));
			i++;
		}
	};

	$("#createTask").click(() => {
		let name = nameInput.val();
		let description = descriptionInput.val();
		if (name === "" || description === "") {
			alert("You need to name project and description");
			return;
		}
		let localStorageKeyTitle = `project${name}`;
		let localStorageKeyDescription = `description${name}`;
		createToDo(
			name,
			description,
			localStorageKeyTitle,
			localStorageKeyDescription
		);
		setItem(localStorageKeyTitle, name);
		keys.push(localStorageKeyTitle);
		setItem(localStorageKeyDescription, description);
		keys.push(localStorageKeyDescription);
		setItem("myData", JSON.stringify(keys));
		nameInput.val("");
		descriptionInput.val("");
	});
	$("#clearSavedTasks").click(()=>{
		localStorage.clear()
	})

	let getString = localStorage.getItem("myData");
	console.log(getString);
	let parsedKeys = jQuery.parseJSON(getString);
	console.log(parsedKeys);

	savedToDo();
});
