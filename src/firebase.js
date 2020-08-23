var firebaseConfig = {
    
};


firebase.initializeApp(firebaseConfig);
let myBase = {
    get: (path) => {
        return firebase.database().ref(path).once('value').then(function (snapshot) {
            return snapshot.val();
        })
    },
    getList: (path) => {
        return firebase.database().ref(path).once('value').then(function (snapshot) {
            const data = snapshot.val();
            return data;
        })
    },
    save: (path, obj) => {
        return firebase.database().ref(path).set(obj, function (error) {
            if (error) {
                console.log(error);
            } else {
                console.log('Data saved successfully!');
            }
        });
    },
    listener: (action, path, callback) => {
        return firebase.database().ref(path).on(action, snap => {
            callback(snap.val());
        });
    }
}
export default myBase;


var ui = new firebaseui.auth.AuthUI(firebase.auth());
firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        document.querySelector("#firebaseui-auth-container").innerHTML = user.displayName;
    } else {
        ui.start('#firebaseui-auth-container', {
            callbacks: {
                signInSuccessWithAuthResult: function (authResult, redirectUrl) {
                    return true;
                },
                uiShown: function () {
                    console.log(firebase.auth().currentUser);
                    if (!!firebase.auth().currentUser) {
                        document.querySelector("#firebaseui-auth-container").remove();
                    }
                }
            },
            signInFlow: 'popup',
            signInOptions: [
                firebase.auth.GoogleAuthProvider.PROVIDER_ID
            ]
        });
    }
});
