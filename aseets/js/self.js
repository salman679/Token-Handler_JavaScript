let btn = document.getElementById('add-token');

let TokenData = [];
let updateItems = null;
tokenHandler()
editHandler()

btn.addEventListener('click', e => {
    e.preventDefault();

    let fullForm = new FormData(document.getElementById('total-form'));
    let activeItems = Object.fromEntries(fullForm)

    const validform = activeItems.nameInput !== '' && activeItems.emailInput !== '';
    document.querySelectorAll('.mantatory').forEach(item => {
        item.style.display = validform ? "none" : "block";
    })

    if (validform) {
        if (!updateItems) {
            TokenData.push({
                ...activeItems,
                id: TokenData.length + 1
            })
        } else {

            // update previous item
            TokenData = TokenData.map(item => {
                if (item.id == updateItems) {
                    return {
                        ...activeItems,
                        id: updateItems
                    }
                } else {
                    return item;
                }
            })
        }
    }

    tokenHandler()
    updateItems = '';
    document.getElementById('total-form').reset();
})

// create li structure
function liStructure(item) {
    return `<li data-id="${item.id}" class="active-info li-mama">
                <div class="left">
                    <p>${item.nameInput}</p>
                    <span>${item.emailInput}</span>
                </div>
                <div class="right">
                    <a href="#">Token No: ${item.id}</a>
                </div>
            </li>`
}

function tokenHandler() {

    let ulElements = {
        Active: {
            ulElement: document.getElementById('ul-active'),
            liElements: [],
            totalsectionData: document.getElementById('total-active')
        },
        Complete: {
            ulElement: document.getElementById('ul-complete'),
            liElements: [],
            totalsectionData: document.getElementById('total-complete')
        },
        Cancel: {
            ulElement: document.getElementById('ul-cancel'),
            liElements: [],
            totalsectionData: document.getElementById('total-cancel')
        }
    }

    TokenData.map(items => {
        ulElements[items.statusSection].liElements.push(liStructure(items));
    })

    for (let key in ulElements) {
        if (ulElements[key].liElements.length == 0) {
            ulElements[key].ulElement.innerHTML = `<li class="text-center active-info d-block fs-5">No Data Found</li>`
        } else {
            ulElements[key].ulElement.innerHTML = ulElements[key].liElements.join('');
        }
        ulElements[key].totalsectionData.innerHTML = ulElements[key].liElements.length;

        document.getElementById('Total-Token').innerHTML = TokenData.length <= 9 ? '0' + TokenData.length : TokenData.length;
    }
}

// editHandler
function editHandler() {
    let tokenpackege = document.querySelector('.token-package');
    tokenpackege.addEventListener('click', e => {
        e.preventDefault();

        let li = e.target.closest('.li-mama');

        if (li) {
            let dataId = li.getAttribute('data-id');
            console.log(dataId);
            let edit = TokenData.find(item => {
                return item.id == dataId
            })

            for (let i in edit) {
                if (document.querySelector(`[name="${i}"]`)) {
                    document.querySelector(`[name="${i}"]`).value = edit[i];
                }
            }

            updateItems = dataId;
        }
    })
}