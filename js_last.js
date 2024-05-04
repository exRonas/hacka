const elements = document.querySelectorAll(".image_block");
const practise = document.querySelectorAll(".question_answer");
const element = document.querySelectorAll(".drag_image");
const practiseText = document.querySelectorAll(".practise_text");
const codeShow = document.querySelectorAll(".code_show");
const buttonShow = document.querySelector(".button_row");
const closeCode = document.querySelectorAll(".code_close");
const checkButton = document.querySelector(".answer_check");

let answer = {
    text: null,
    block: null,
    answers: null,
    parent: null,
    check: false,
};

// Действия для ПК
function checkFunc(e) {
    if (answer.check && answer.block) {
        if (answer.answers != null) {
            answer.block.lastChild.removeAttribute("draggable");
            answer.answers.previousElementSibling.classList.add("d-none");

            answer.answers.classList.remove("d-none");
            try{
            answer.block.parentNode.nextElementSibling.classList.remove(
                "d-none"
            );
        }catch{}
            answer.check, (answer.block = null);

            let audio = new Audio("/sound/m.m4a");
            audio.play();

            let done = document.querySelector(".done");
            answer.check, (answer.block = null);
            done.style.top = "10px";
            setTimeout(() => {
                done.style.top = "-500px";
            }, 3500);
        } else {
            answer.parent.classList.add("d-none");
            e.target.classList.add("d-none");
            let done = document.querySelector(".done_text");
            let audio = new Audio("/sound/n.m4a");
            audio.play();
            answer.check, (answer.block = null);
            done.style.top = "10px";
            setTimeout(() => {
                done.style.top = "-500px";
            }, 3500);
        }
    } else {
        let ops = document.querySelector(".ops");
        ops.style.top = "10px";
        let audio = new Audio("/sound/t.m4a");
        audio.play();
        e.target.setAttribute("disabled", "true");
        setTimeout(() => {
            e.target.removeAttribute("disabled");
            ops.style.top = "-500px";
        }, 2500);
    }
}
elements.forEach((elem) => {
    elem.ondragover = allowDrop;
    elem.ondrop = revDrop;
});
element.forEach((elem) => {
    elem.ondragstart = drag;
});
practise.forEach((elem) => {
    elem.ondragover = allowDrop;
    elem.ondrop = drop;
});

function allowDrop(event) {
    event.preventDefault();
}

function revDrop(event) {
    let item = event.dataTransfer.getData("id");
    let targ = event.target;
    let count = targ.parentNode.getAttribute("practise");
    let elem = document.querySelectorAll("#" + item)[count - 2];
    answer.text = null;
    answer.block = null;
    answer.check = false;
    if (elem) {
        if (targ.classList.contains("drag_image")) {
            targ.parentNode.append(elem);
        } else {
            targ.append(elem);
        }
        elem.classList.remove("col-8");
        elem.classList.add("col-3");
    } else {
        return;
    }
}

function drop(event) {
    let item = event.dataTransfer.getData("id");
    let targ = event.target;
    let count = targ.parentNode.parentNode.getAttribute("practise");
    let elem = document.querySelectorAll("#" + item)[count - 2];
    if (elem == null) {
        elem = document.querySelectorAll("#" + item)[
            targ.parentNode.parentNode.parentNode.getAttribute("practise") - 2
        ];
    }
    if(elem.parentNode.classList.contains('question_answer')){
        resetStyle(elem);
        return;
    }
    checkAnswer(elem, targ);

    if (targ.classList.contains("drag_image")) {
        if(targ.getAttribute('draggable') == null){
            return;
        }   
        let parent = elem.parentNode;
        To8(elem);
        targ.parentNode.append(elem);

        To3(targ);
        parent.append(targ);
        checkAnswer(elem, elem.parentNode);
        resetStyle(elem);
    } else {
        if (targ.lastChild.classList) {
            return;
        }
        targ.append(elem);
    }
    elem.classList.remove("col-3");
    elem.classList.add("col-8");
}
function drag(event) {
    event.dataTransfer.setData("id", event.target.id);
    console.log('\n\n\n');
    console.log(answer)
    if(event.target.parentNode.parentNode.parentNode.tagName != 'OL'){
        answer.parent = event.target.parentNode.parentNode.parentNode;
        console.log(event.target.parentNode.nextElementSibling)
        if(event.target.parentNode.nextElementSibling != null){
            answer.answers = event.target.parentNode.nextElementSibling;
        }
    }
}

codeShow.forEach((elem) => {
    elem.addEventListener("click", (e) => {
        let img = document.getElementById(elem.getAttribute("img"));
        img.classList.remove("d-none");
        buttonShow.classList.add("d-none");
    });
});
closeCode.forEach((elem) => {
    elem.addEventListener("click", (e) => {
        e.target.parentNode.parentNode.classList.add("d-none");
        buttonShow.classList.remove("d-none");
    });
});

// Действия для телефона
let mov = null; // Передвигаемый элемент
element.forEach((elem) => {
    elem.addEventListener("touchstart", function (e) {
        e.preventDefault();
        if (e.target.getAttribute("style")) {
            e.target.removeAttribute("style");
        }
        answer.parent = e.target.parentNode.parentNode.parentNode;
        if (
            e.target.getAttribute("draggable") != null &&
            !e.target.parentNode.classList.contains("question_answer")
        ) {
            answer.answers = e.target.parentNode.nextElementSibling;
        }
        if (
            e.target.parentNode.classList.contains("question_answer") &&
            e.target.getAttribute("draggable") == null
        ) {
            return;
        } else {
            mov = e.target;
        }
    });
});

elements.forEach((elem) => {
    elem.addEventListener("touchend", (e) => {
        drops(e);
    });
});
practise.forEach((elem) => {
    elem.addEventListener("touchend", (e) => {
        reverseDrops(e);
    });
});

document.querySelector(".slider").addEventListener("touchmove", (e) => {
    if (mov) {
        mov.style.position = "fixed";
        mov.style.left =
            e.changedTouches[0].clientX - mov.clientWidth / 2 + "px";
        mov.style.top =
            e.changedTouches[0].clientY - mov.clientHeight / 2 + "px";
    }
});

function drops(event) {
    if (mov) {
        if (event.currentTarget.tagName !== "HTML") {
            let target = null;
            mov.style.zIndex = "-10";
            if (event.changedTouches[0].clientX) {
                target = document.elementFromPoint(
                    event.changedTouches[0].clientX,
                    event.changedTouches[0].clientY
                );
                const targetClass = target.classList;
                if (
                    targetClass.contains("question_answer") ||
                    targetClass.contains("image_block")
                ) {
                    resetStyle(mov);
                    if (
                        targetClass.contains("image_block") ||
                        targetClass.contains("drag_image")
                    ) {
                        return;
                    } else {
                        try {
                            if (target.lastChild.classList != null) {
                                return;
                            }
                        } catch {
                            if (target.lastChild != null) {
                                return;
                            }
                        }
                        checkAnswer(mov, target);
                        target.append(mov);
                    }
                    To8(mov);
                } else {
                    if (
                        targetClass.contains("drag_image") &&
                        mov.parentNode != target.parentNode &&
                        target.getAttribute("draggable") != null
                    ) {
                        To8(mov);
                        target.parentNode.append(mov);

                        To3(target);
                        event.currentTarget.append(target);
                        checkAnswer(mov, mov.parentNode);
                    }
                    resetStyle(mov);
                }
            }
        }
        mov = null;
    }
}
function reverseDrops(event) {
    if (mov) {
        if (event.currentTarget.tagName !== "HTML") {
            let target = null;
            mov.style.zIndex = "-10";
            if (event.changedTouches[0].clientX) {
                target = document.elementFromPoint(
                    event.changedTouches[0].clientX,
                    event.changedTouches[0].clientY
                );
                const targetClass = target.classList;
                if (
                    targetClass.contains("drag_image") ||
                    targetClass.contains("image_block")
                ) {
                    if (target.parentNode.classList.contains("question_answer")) {
                        resetStyle(mov);
                        return;
                    }
                    resetStyle(mov);

                    if (
                        targetClass.contains("drag_image") &&
                        !target.parentNode.classList.contains("question_answer")
                    ) {
                        target.parentNode.append(mov);
                    } else {
                        answer.text = null;
                        answer.block = null;
                        answer.check = false;
                        target.append(mov);
                    }
                    mov.classList.remove("col-8");
                    mov.classList.add("col-3");
                } else {
                    resetStyle(mov);
                }
            }
        }
        mov = null;
    }
}

function To8(elem) {
    elem.classList.remove("col-3");
    elem.classList.add("col-8");
}
function To3(elem) {
    elem.classList.remove("col-8");
    elem.classList.add("col-3");
}
function resetStyle(elem) {
    elem.style.position = "inherit";
    elem.style.left = "";
    elem.style.top = "";
    elem.style.height = "";
    elem.style.width = "";
    elem.style.position = "";
    elem.style.zIndex = "";
}

// Отключение кнопок
let currentElement = document.querySelector(".practice_1");
const check = document.querySelector(".check");
check.addEventListener("click", function (event) {
    event.preventDefault();
    let nextElement = currentElement.nextElementSibling;
    nullAnswers(nextElement);
    if (!nextElement.classList.contains("practise_cover")) {
        return;
    }
    buttonDisable();
    disable(nextElement, "+");
});

const back = document.querySelector(".back");
back.addEventListener("click", function (event) {
    event.preventDefault();
    let prevElement = currentElement.previousElementSibling;
    nullAnswers(prevElement);
    if (!prevElement) {
        return;
    }
    buttonDisable();
    disable(prevElement, "-");
});

function disable(element, time) {
    currentElement.setAttribute("style", "opacity: 0%;");
    setTimeout(() => {
        if (time == "+") {
            currentElement.previousElementSibling.classList.add("d-none");
        } else if (time == "-") {
            currentElement.nextElementSibling.classList.add("d-none");
        } else {
            return;
        }
        element.setAttribute("style", "");
        element.classList.remove("d-none");
        check.removeAttribute("disabled");
        back.removeAttribute("disabled");
    }, 410);
    answer = {
        text: null,
        block: null,
        answers: null,
        parent: null,
        check: false,
    };
    currentElement = element;
}
function nullAnswers(elem) {
    let clean = elem.childNodes[1].childNodes[3].childNodes[1].childNodes;
    let back = elem.childNodes[3].childNodes[1].childNodes;
    let letOut = null;

    try {
        for (i = 1; i < back.length; i += 2) {
            if (back[i + 2].classList.contains("d-none")) {
                letOut = back[i];
                throw new Error("");
            }
        }
    } catch (error) {}
    try {
        clean.forEach((element) => {
            if (element.nodeName != "#text" && element.nodeName == "LI")
                try {
                    if (
                        element.nextElementSibling.classList.contains("d-none")
                    ) {
                        let answ = element.childNodes[3].childNodes;
                        if (answ.length > 1) {
                            To3(answ[i]);
                            letOut.append(answ[1]);
                            throw new Error("ff");
                        }
                    }
                } catch {}
        });
    } catch (error) {}
}
function buttonDisable() {
    check.setAttribute("disabled", "");
    back.setAttribute("disabled", "");
}
function checkAnswer(elem, targ) {
    answer.text = elem;
    if (targ.classList.contains("r_" + elem.innerText)) {
        answer.check = true;
    } else {
        answer.check = false;
    }
    answer.block = targ;
}

// Комментарии добавлю потом
