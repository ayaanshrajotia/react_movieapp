import React from "react";

const getPosterPath = (posterPath) => {
    return `https://image.tmdb.org/t/p/w500/${posterPath}`;
};

const CharacterCard = ({ name, character, profile_path }) => {
    return (
        <div className="character_card">
            <div className="character_card__profile">
                {profile_path !== null ? (
                    <img src={getPosterPath(profile_path)} alt="" />
                ) : (
                    <img
                        className="character_card__profile"
                        src="https://img.freepik.com/premium-photo/black-director-chair-is-isolated-black-background-it-use-video-production-movie-industry-studio-shot_335640-1963.jpg"
                        alt="Alt Poster"
                    />
                )}
            </div>
            <div className="character_card__details">
                <p className="character_name">{name}</p>
                <p className="character__details">{character}</p>
            </div>
        </div>
    );
};

export default CharacterCard;
