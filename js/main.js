$(document).ready(function(){
    let nameOfContact = $('.name-input')
    let lastNameOfContact = $('.last-name-input')
    let phoneNumberOfContact = $('.phone-number-input')
    let btn = $('.btn')
    let list = $('.contact-list')
    let modal = $("#my_modal");
    let span = $(".close_modal_window");
    let btnSave = $('.btn-save')
    let inpEditName = $('.inp-edit-name')
    let inpEditLatName = $('.inp-edit-lastname')
    let inpEditPhoneNumber = $('.inp-edit-phone-number')

    render()

    btn.on('click', function(){
        if(!nameOfContact.val() || !phoneNumberOfContact.val()) return
        data = {
            name: nameOfContact.val(),
            lastName: lastNameOfContact.val(),
            phoneNumber: phoneNumberOfContact.val()
        }
        addContact(data)
    })

    function addContact(data){
        if(!localStorage.getItem('contacts')) localStorage.setItem('contacts', '[]')
        let all_contacts = JSON.parse(localStorage.getItem('contacts'))
        all_contacts.push(data)
        localStorage.setItem('contacts', JSON.stringify(all_contacts))
        render()
    }


    function render(){
        if(!localStorage.getItem('contacts')) localStorage.setItem('contacts', '[]')
        let all_contacts = JSON.parse(localStorage.getItem('contacts'))
        list.html('')
        all_contacts.forEach(elem => {
            list.append(
                `<li><strong>name: </strong> ${elem.name} <br> 
                <strong>lastname: </strong>${elem.lastName} <br> 
                <strong> phone number:</strong> ${elem.phoneNumber} <br> 
                <button class="btn-delete">Delete</button>
                <button class="btn-edit">Edit</button></li>`
                )
        })
    }

    $('body').on('click', '.btn-delete', function(){
        let all_contacts = JSON.parse(localStorage.getItem('contacts'))
        let indexForDelete = $(this).parent().index()

        all_contacts.splice(indexForDelete, 1)
        localStorage.setItem('contacts', JSON.stringify(all_contacts))
        render()
    })

    $('body').on('click', '.btn-edit', function(event){
        event.stopPropagation()
        modal.css('display', 'block');
        let all_contacts = JSON.parse(localStorage.getItem('contacts'))
        let index = $(this).parent().index()
        inpEditName.attr('id', index)
        inpEditName.val(all_contacts[index].name)
        inpEditLatName.val(all_contacts[index].lastName)
        inpEditPhoneNumber.val(all_contacts[index].phoneNumber)
    })

    btnSave.on('click', function(){
        let id = inpEditName.attr('id')
        let all_contacts = JSON.parse(localStorage.getItem('contacts'))
        let newContact = {
            name: inpEditName.val(),
            lastName: inpEditLatName.val(),
            phoneNumber: inpEditPhoneNumber.val()
        }
        all_contacts.splice(id, 1, newContact)
        localStorage.setItem('contacts', JSON.stringify(all_contacts))
        modal.css('display', 'none')
        render()
    })

    span.on('click', function(event) {
        event.stopPropagation()
        modal.css('display', 'none');
        render()
    })

    $(window).on('click', function(event) {
        if ($(event.target).is(modal)){
            modal.css('display', 'none');
        }
        render()
    })
    render()
})
