import React from "react";
import Faq from "react-faq-component";

const data = {
    title: "",
    rows: [
        {
            title: "What is a Property Tax Assessment?",
            content: `An assessment is a declaration of the details of a particular Property to your local municipal government for a particular year. The payable Property Tax is calculated based on these details. An Assessment is completed when your Municipality receives the full payment of your Property Tax.`,
        },
        {
            title: "What is the difference between Existing Property ID & Property Tax Unique ID?",
            content:
                "Existing Property ID has been assigned to you by your local municipal government prior to your using this platform to pay your Property Taxes. Property Tax Unique ID is a new ID being assigned to identify your property.",
        },
        {
            title: "What should I do if i have assessed and paid with incorrect details by mistake?",
            content: `You can re-assess your property. This option is available in your Assessment History in your list of properties (My properties). `,
        },
        {
            title: "Is Property tax receipt a legal proof of property ownership?",
            content: 'Yes. But keep in mind that Payment of Property tax does not serve as a proof of ownership of the property.',
        },
    ],
};

const styles = {
    // bgColor: 'white',
    titleTextColor: "black",
    rowTitleColor: "black",
    // rowContentColor: 'grey',
    // arrowColor: "red",   

};

const config = {
     animate: true,
     arrowIcon: "+",
    // tabFocus: true
};


export default function SectionFAQs() {

    return (
        <div>
            <Faq
                data={data}
                styles={styles}
                config={config}
            />
        </div>
    );
}