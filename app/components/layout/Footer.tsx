export default function Footer() {
    return (
        <footer className="text-white text-md pt-80 px-8 md:px-0">
            <p>Food Truck Tracker is a conceptual demo project built for portfolio purposes.</p>
            <p>The trucks, menus, and schedules shown here are fictional and not serving real food (sadly 🤗).</p>
            <div
                dangerouslySetInnerHTML={{
                    __html: "<!-- If you’re reading this, this is all-you-can’t-eat. 🤗 -->",
                }}
            />
        </footer>
    );
}