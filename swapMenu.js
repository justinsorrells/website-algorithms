class SwapMenu {
    state;
    constructor() {
        this.state = false;
        const toggleParent = document.querySelector(".form__switch");
        const toggle = document.querySelector(".form__switch__input");
        toggle.checked = false;
        toggle.focus = false;
        const automatic = document.querySelector("#automatic");
        toggleParent.addEventListener('click', (e) => {
            const state = toggle.checked;
            if (state == true)
            {
                toggle.checked = false;
                toggle.focus = false;
                this.state = false;
                automatic.style.display = "none";
            }
            else
            {
                toggle.checked = true;
                toggle.focus = true;
                this.state = true;
                automatic.style.display = "block";
            }
        });
    }

    set state(bool)
    {
        this.state = bool;
    }

    get state()
    {
        return this.state;
    }

}




export default SwapMenu;