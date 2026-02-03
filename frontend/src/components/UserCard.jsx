import { Link } from "react-router-dom";

export default function UserCard({ user, currentUser, onFollow }) {

    // Note: Your original code references 'isFollowing' but it is not defined/derived.
    // Assuming it should come from props or computed — for now keeping the ternary as-is.
    // If you have isFollowing logic elsewhere, pass it as prop or compute it here.

    const isFollowing = user.followers?.includes(currentUser.id); // ← added example derivation

    return (
        <article className="
            bg-white dark:bg-neutral-900
            border border-neutral-200 dark:border-neutral-800
            rounded-xl p-5
            hover:border-neutral-300 dark:hover:border-neutral-700
            hover:shadow-md transition duration-200 shadow-sm
        ">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 flex-1">
                    <Link to={`/u/${user.username}`} className="shrink-0">
                        <div className={`
                            w-14 h-14 rounded-full 
                            bg-neutral-900 flex items-center justify-center 
                            text-lg font-semibold text-white
                            hover:scale-105 transition duration-200 shadow-sm
                        `}>
                            {user.avatar ? (
                                <img src={user.avatar} alt={user.name} className="w-full h-full object-cover rounded-full" />
                            ) : (
                                <span>
                                    {(user.name || user.username || "U").charAt(0).toUpperCase()}
                                </span>
                            )}
                        </div>
                    </Link>

                    <div className="flex-1 min-w-0">
                        <Link to={`/u/${user.username}`} className="block hover:underline">
                            <h3 className="font-medium text-base text-neutral-900 dark:text-neutral-100">
                                {user.name}
                            </h3>
                        </Link>
                        <p className="text-neutral-600 dark:text-neutral-400 text-sm">
                            @{user.username}
                        </p>
                        <p className="text-neutral-500 dark:text-neutral-400 text-xs mt-1.5 line-clamp-2 leading-relaxed">
                            {user.bio || "No bio yet"}
                        </p>

                        <div className="flex items-center gap-5 mt-3 text-xs">
                            <span className="text-neutral-600 dark:text-neutral-400">
                                <span className="font-semibold text-neutral-900 dark:text-neutral-100">
                                    {user.postCount || "-"}
                                </span> Posts
                            </span>
                            <span className="text-neutral-600 dark:text-neutral-400">
                                <span className="font-semibold text-neutral-900 dark:text-neutral-100">
                                    {user.followersCount || "-"}
                                </span> Followers
                            </span>
                            <span className="text-neutral-600 dark:text-neutral-400">
                                <span className="font-semibold text-neutral-900 dark:text-neutral-100">
                                    {user.followingCount || "-"}
                                </span> Following
                            </span>
                        </div>
                    </div>
                </div>

                {user.id !== currentUser.id && (
                    <button
                        onClick={() => onFollow(user.id)}
                        className={`
                            font-medium px-6 py-2 rounded-xl text-sm transition shadow-sm shrink-0
                            ${isFollowing
                                ? 'bg-neutral-200 dark:bg-neutral-800 hover:bg-neutral-300 dark:hover:bg-neutral-700 text-neutral-800 dark:text-neutral-200 border border-neutral-300 dark:border-neutral-700'
                                : 'bg-neutral-900 hover:bg-neutral-800 active:bg-neutral-950 text-white'
                            }
                        `}
                    >
                        {isFollowing ? 'Following' : 'Follow'}
                    </button>
                )}
            </div>
        </article>
    );
}