function RandIndex(max) {
    return Math.floor(Math.random() * (max + 1));
}

let questionDiv=document.getElementById('question')
let optionsDiv=document.getElementById('options')
let c =0
let nextBttn=document.getElementById('n')
let submitBttn=document.getElementById('s')
let startBttn=document.getElementById('start')
let Questions
let url='https://opentdb.com/api.php?'
submitBttn.style.visibility="hidden"
nextBttn.style.visibility="hidden"
startBttn.addEventListener("click", evt => {
	url+="amount="+document.getElementById('amount').value
	var cat=document.getElementById('category')
	var dif = document.getElementById('difficulty')
	var type =document.getElementById('type')
	cat.options[cat.selectedIndex].value!="any"?url+="&category="+cat.options[cat.selectedIndex].value:url=url
	dif.options[dif.selectedIndex].value!="any"?url+="&difficulty="+cat.options[dif.selectedIndex].value:url=url
	type.options[type.selectedIndex].value!="any"?url+="&type="+type.options[type.selectedIndex].value:url=url
	console.log(url)
	fetch(url)
	.then(response => response.json())
	.then(questions => {Questions = questions.results} )
	.then( evt => {
					questionDiv.innerHTML = `<p> ${Questions[c].question} </p>`
					let x= RandIndex(Questions[c].incorrect_answers.length)
					let y=0
					let value=""
					let label=""
					optionsDiv.innerHTML=``
					for(let i=0;i<=Questions[c].incorrect_answers.length;i++){
						if(i==x){
							value="Correct"
							label=Questions[c].correct_answer
						} 
						else{
							value="Incorrect"
							label=Questions[c].incorrect_answers[y]
							y++
						}
						optionsDiv.innerHTML += `<input type="radio" id="${i}" name="options" value="${value}">\n<label for="${i}">${label}</label><br>`
					}
					c++	
					document.getElementById('form').style.visibility="hidden"
					submitBttn.style.visibility="visible" 
				})
});

nextBttn.addEventListener("click", evt => {
	if(c<10){
		questionDiv.innerHTML = `<p> ${Questions[c].question} </p>`
		let x= RandIndex(Questions[c].incorrect_answers.length)
		let y=0
		let value=""
		let label=""
		optionsDiv.innerHTML=``
		for(let i=0;i<=Questions[c].incorrect_answers.length;i++){
			if(i==x){
				value="Correct"
				label=Questions[c].correct_answer
			} 
			else{
				value="Incorrect"
				label=Questions[c].incorrect_answers[y]
				y++
			}
			optionsDiv.innerHTML += `<input type="radio" id="${i}" name="options" value="${value}">\n<label for="${i}">${label}</label><br>`
		}


		c++	
	}
	else{
		questionDiv.innerHTML = `<p> END OF QUIZ </p>`
		optionsDiv.innerHTML=``
	}
	nextBttn.style.visibility="hidden"
	submitBttn.style.visibility="visible"
});

submitBttn.addEventListener("click",evt=>{
	if(document.querySelector('input[name="options"]:checked')==null){
		alert("please select a option")
	}
	else{
		questionDiv.innerHTML = `<p>${document.querySelector('input[name="options"]:checked').value}</p>`
		optionsDiv.innerHTML=``
		submitBttn.style.visibility="hidden"
		nextBttn.style.visibility="visible"
	}
});