exports.replaceEmoj =  function replaceEmoj(str)
{
	return str.replace(/@Birth@/g,"📆 ")
			.replace(/@Education@/g,"🎓 ")
			.replace(/@En@/g,"🗣 ")
			.replace(/@Geo@/g,"🗣 ")
			.replace(/@Ru@/g,"🗣 ")
			.replace(/@Time@/g,"⏰ ")
			.replace(/@Person@/g,"👤 ")
			.replace(/@Tel@/g,"☎ ️")
			.replace(/@Request@/g,"📝 ")
			.replace(/@Telegram@/g,"🌍 ")
			.replace(/@Web@/g,"🌍 ")
			.replace(/@CoField@/g,"⌨️ ")
			.replace(/@Experience@/g,"📂 ")
			.replace(/@Money@/g,"💵 ")
			.replace(/@Note@/g,"📃 ")
			.replace(/@Goals@/g,"🎈 ")
			.replace(/@Hobbies@/g," ⛷ ")
			.replace(/@Married@/g," 💑 ")
			.replace(/@Email@/g," 📧 ")
			.replace(/@LinkedIn@/g," 🖥 ")
			.replace(/@National@/g," 🏁 ")
			.replace(/@KISS@/g," 😘 ")
			.replace(/@BYE@/g," 🖐🏻 ")
			.replace(/@IMOGI@/g," 🥛🔮💜 ")
			.replace(/@Marriage@/g," 👩‍❤️‍👩 ")
			.replace(/@Military@/g, " 💂🏿‍♀️ ")
			.replace(/@Gender@/g, " 👤 ")
			.replace(/@Fund@/g, " 💰 ")
			.replace(/@Child@/g, " 👼🏻 ")
			.replace(/@Property@/g, " 🏦 ")
			.replace(/@Income@/g, " 💵 ");
}

exports.replaceText =  function replaceText(str)
{
	str = exports.replaceEmoj(str);
	return str.replace(/ true/g, " اره")
		.replace(/ false/g," نه ")
		.replace("georgia"," گرجستان ")
		.replace("canada"," کانادا ")
		.replace("germany"," آلمان ")
		.replace("austria"," اتریش ")
		.replace("greece"," یونان ")
		.replace("Male"," مرد ")
		.replace("Female"," زن ")
		.replace("NotMarried"," مجرد ")
		.replace("Married"," متاهل ")
		.replace(/","/g, ",")
		.replace("]", "")
		.replace("[", "");
}