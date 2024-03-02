const Comment = prop => {
    return (
        <div className="border border-black col-span-2">
            <div>
                <u>
                    {prop.login}:
                </u>
            </div>
            <div>
                {prop.comment}
            </div>
        </div>
    )
}

export default Comment;